import { EventData, ConversionResponse } from '../types/facebook';

const bizSdk = require('facebook-nodejs-business-sdk');

const accessToken: string = process.env.FACEBOOK_ACCESS_TOKEN || '';
const pixelId: string = process.env.FACEBOOK_PIXEL_ID || '';

const api = bizSdk.FacebookAdsApi.init(accessToken);



let current_timestamp = Math.floor(Date.now() / 1000);

export async function sendConversion(eventData: EventData): Promise<ConversionResponse> {
  const { ServerEvent, EventRequest, UserData, CustomData } = bizSdk;
  
  try {
    if (!accessToken || !pixelId) {
      throw new Error('Facebook credentials not configured');
    }

    const serverEvent = new ServerEvent();
    serverEvent.setEventName(eventData.eventName || 'Purchase');
    serverEvent.setEventTime(eventData.event_time || Math.floor(Date.now() / 1000));
    
    // Set event_id if provided for deduplication
    if (eventData.event_id) {
      serverEvent.setEventId(eventData.event_id);
    }
    
    const userData = new UserData();
    if (eventData.email) {
      userData.setEmail(eventData.email.toLowerCase().trim());
    }
    if (eventData.phone) {
      const cleanPhone = eventData.phone.replace(/\D/g, '');
      userData.setPhone(cleanPhone);
    }
    
    // NEW TRACKING FIELDS ABOUT THE COOKIES
    if (eventData.fbp) {
      userData.setFbp(eventData.fbp);
    }
    if (eventData.fbc) {
      userData.setFbc(eventData.fbc);
    }
    if (eventData.userAgent) {
      userData.setClientUserAgent(eventData.userAgent);
    }
    
    // NEW FIELD ABOUT THE COOKIES 

    if (eventData.ipAddress) {
      userData.setClientIpAddress(eventData.ipAddress);
    }
    
    // Set external_id for user matching
    if (eventData.external_id) {
      userData.setExternalId(eventData.external_id);
    }
    
    serverEvent.setUserData(userData);
    
    if (eventData.value && eventData.value > 0) {
      const customData = new CustomData();
      customData.setValue(eventData.value);
      customData.setCurrency(eventData.currency || 'BRL');
      
      if (eventData.productName) {
        customData.setContentName(eventData.productName);
      }
      
      serverEvent.setCustomData(customData);
    }
    
    const eventRequest = new EventRequest(accessToken, pixelId);
    eventRequest.setEvents([serverEvent]);
    
    const response = await eventRequest.execute();
    
    console.log('✅ Event sent with tracking data:', {
      event: eventData.eventName,
      value: eventData.value,
      fbp: eventData.fbp ? 'present' : 'missing',
      fbc: eventData.fbc ? 'present' : 'missing',
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      message: 'Conversion sent successfully!',
      data: response
    };
    
  } catch (error: any) {
    console.error('❌ Error sending event:', error);
    
    return {
      success: false,
      error: error.message || 'Unknown error'
    };
  }
}