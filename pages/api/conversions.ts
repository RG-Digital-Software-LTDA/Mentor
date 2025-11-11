import type { NextApiRequest, NextApiResponse } from 'next';
import { sendConversion } from '../../services/facebookConversions';
import { EventData, ConversionResponse } from '../../types/facebook';
import { getTrackingData } from '@/lib/trackingUtils';
import { getLocationFromIP } from '@/lib/locationUtils';


// Function to get client IP
function getClientIP(req: NextApiRequest): string {
  // Prioridade para headers que podem conter o IP real
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const cfConnectingIP = req.headers['cf-connecting-ip'];
  
  let ip = '';
  
  if (cfConnectingIP) {
    ip = Array.isArray(cfConnectingIP) ? cfConnectingIP[0] : cfConnectingIP;
  } else if (realIP) {
    ip = Array.isArray(realIP) ? realIP[0] : realIP;
  } else if (forwarded) {
    ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
  } else {
    ip = req.connection?.remoteAddress || req.socket?.remoteAddress || '';
  }
  
  // Limpar espaços e pegar primeiro IP se houver múltiplos
  ip = ip.trim().split(',')[0].trim();
  
  // Se for localhost, vamos usar um IP público para teste
  if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1' || !ip) {
    console.log('🏠 IP local detectado, usando IP público para teste');
    ip = '8.8.8.8'; // IP público do Google para teste
  }
  
  console.log('🌐 IP detectado:', ip);
  return ip;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversionResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const eventData: EventData = req.body;
    
    // ADD IP ADDRESS from server
    eventData.ipAddress = getClientIP(req);
    
    // ADD LOCATION DATA from IP
    const locationData = await getLocationFromIP(eventData.ipAddress);
    console.log('📍 Location data:', locationData);
    
    // For PageView events, email/phone is not required (we use fbp/fbc instead)
    if (!eventData.email && !eventData.phone && eventData.eventName !== 'PageView' && !eventData.fbp) {
      return res.status(400).json({
        success: false,
        error: 'Email, phone, or Facebook pixel data (fbp) is required'
      });
    }

    console.log('📨 Received conversion event:', {
      type: eventData.eventName,
      value: eventData.value,
      ip: eventData.ipAddress,
      fbp: eventData.fbp ? 'present' : 'missing',
      fbc: eventData.fbc ? 'present' : 'missing',
      timestamp: new Date().toISOString()
    });
    
    const result = await sendConversion(eventData);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
    
  } catch (error: any) {
    console.error('💥 API Error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}