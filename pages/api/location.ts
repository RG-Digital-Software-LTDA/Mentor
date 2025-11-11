import type { NextApiRequest, NextApiResponse } from 'next';
import { getLocationFromIP } from '@/lib/locationUtils';

// Function to get client IP
function getClientIP(req: NextApiRequest): string {
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

  ip = ip.trim().split(',')[0].trim();

  if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1' || !ip) {
    ip = '8.8.8.8'; // IP público para teste em localhost
  }

  return ip;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed. Use GET.'
    });
  }

  try {
    const clientIP = getClientIP(req);
    const locationData = await getLocationFromIP(clientIP);

    console.log('📍 Location API called:', {
      ip: clientIP,
      location: locationData
    });

    res.status(200).json(locationData);

  } catch (error: any) {
    console.error('💥 Location API Error:', error);

    res.status(500).json({
      error: 'Failed to get location data',
      message: error.message
    });
  }
}