import type { NextApiRequest, NextApiResponse } from 'next';

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
    // Extrair cookies do cabeçalho
    const cookies = req.headers.cookie || '';
    const cookieObj: { [key: string]: string } = {};

    // Parse dos cookies
    cookies.split(';').forEach(cookie => {
      const parts = cookie.trim().split('=');
      if (parts.length === 2) {
        cookieObj[parts[0]] = parts[1];
      }
    });

    // Gerar UUID se não existir external_id
    function generateUUID(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    // Gerar FBP se não existir
    function generateFbp(): string {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      return `fb.1.${timestamp}.${random}`;
    }

    const trackingData = {
      fbp: cookieObj['_fbp'] || generateFbp(),
      fbc: cookieObj['_fbc'] || null,
      external_id: cookieObj['_external_id'] || generateUUID(),
      event_id: generateUUID(),
      event_time: Math.floor(Date.now() / 1000)
    };

    console.log('🎯 Tracking data API called:', {
      fbp: trackingData.fbp ? 'present' : 'generated',
      fbc: trackingData.fbc ? 'present' : 'missing',
      external_id: trackingData.external_id ? 'present' : 'generated'
    });

    res.status(200).json(trackingData);

  } catch (error: any) {
    console.error('💥 Tracking Data API Error:', error);

    res.status(500).json({
      error: 'Failed to get tracking data',
      message: error.message
    });
  }
}