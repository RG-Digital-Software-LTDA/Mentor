// types para o facebook
export interface EventData {
    eventName?: 'Purchase' | 'Lead' | 'AddToCart' | 'ViewContent' | 'CompleteRegistration' | 'PageView';
    name?: string;
    email?: string;
    phone?: string;
    value?: number;
    currency?: string;
    productName?: string;
    category?: string;

    // new tracking field about the cookies 
    fbp?: string;
    fbc?: string;
    userAgent?: string;
    ipAddress?: string;
    external_id?: string;
    event_id?: string;
    event_time?: number;
    
  }
  
  export interface ConversionResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: string;
  }