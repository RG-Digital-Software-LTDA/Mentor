// lib/trackingUtils.ts
import Cookies from 'js-cookie';

export interface UserTrackingData {
  fbp?: string;        // Facebook browser ID
  fbc?: string;        // Facebook click ID  
  external_id?: string; // UUID para identificar usuário
  event_id?: string;    // UUID único por evento
  event_time?: number;  // Timestamp Unix
  userAgent?: string;   // Fixed field name
  clientIpAddress?: string;
}

// Gerar UUID para external_id
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Gerar ID único do Facebook Browser
export function generateFbp(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `fb.1.${timestamp}.${random}`;
}

// Capturar dados de tracking
export function getTrackingData(): UserTrackingData {
  // Verificar se estamos no cliente
  if (typeof window === 'undefined') {
    return {
      event_id: generateUUID(),
      event_time: Math.floor(Date.now() / 1000),
    };
  }

  // Pegar ou criar Facebook Browser ID
  let fbp = Cookies.get('_fbp');
  if (!fbp) {
    fbp = generateFbp();
    Cookies.set('_fbp', fbp, { 
      expires: 90, // 90 dias
      domain: window.location.hostname.includes('localhost') ? undefined : `.${window.location.hostname}`,
      sameSite: 'lax'
    });
  }

  // Pegar ou criar External ID (UUID)
  let external_id = Cookies.get('_external_id');
  if (!external_id) {
    external_id = generateUUID();
    Cookies.set('_external_id', external_id, { 
      expires: 365, // 1 ano
      domain: window.location.hostname.includes('localhost') ? undefined : `.${window.location.hostname}`,
      sameSite: 'lax'
    });
  }

  // Pegar Facebook Click ID (se veio de anúncio)
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  let fbc = Cookies.get('_fbc');
  
  if (fbclid && !fbc) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    Cookies.set('_fbc', fbc, { 
      expires: 90,
      domain: window.location.hostname.includes('localhost') ? undefined : `.${window.location.hostname}`,
      sameSite: 'lax'
    });
  }

  return {
    fbp,
    fbc,
    external_id,
    event_id: generateUUID(), // UUID único por evento
    event_time: Math.floor(Date.now() / 1000), // Timestamp Unix
    userAgent: navigator.userAgent, // Fixed field name
    clientIpAddress: undefined // Will be detected server-side
  };
}

// Enviar evento para Facebook
export async function sendTrackingEvent(eventName: string, additionalData: any = {}): Promise<void> {
  try {
    const trackingData = getTrackingData();
    
    const eventData = {
      eventName,
      value: eventName === 'PageView' ? 1 : additionalData.value || 0,
      currency: 'BRL',
      productName: 'Infoprodutos Global - Landing Page',
      ...trackingData,
      ...additionalData
    };

    console.log(`🚀 Enviando ${eventName} para Facebook:`, eventData);

    const response = await fetch('/api/conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      console.log(` ${eventName}`);
    } else {
      console.error(` Erro ao enviar ${eventName}`);
    }
  } catch (error) {
    console.error(` Erro ao enviar ${eventName}:`, error);
  }
}

// Inicializar cookies assim que carrega a página
export async function initializeTracking(): Promise<void> {
  // Executa automaticamente quando chamada
  getTrackingData();
  
  console.log(' Cookies de tracking inicializados:', {
    fbp: Cookies.get('_fbp') ? 'presente' : 'criado',
    fbc: Cookies.get('_fbc') ? 'presente' : 'ausente (normal)',
    external_id: Cookies.get('_external_id') ? 'presente' : 'criado'
  });

  // Enviar PageView automaticamente
  await sendTrackingEvent('PageView', {
    content_name: 'Home',
    content_category: 'home',
    value: 1
  });
}

// Função específica para disparar ViewContent na seção Mentor-bio
export async function sendTrackingEventMentorBio(): Promise<void> {
  
  console.log(' Cookies de tracking inicializados:', {
    fbp: Cookies.get('_fbp') ? 'presente' : 'criado',
    fbc: Cookies.get('_fbc') ? 'presente' : 'ausente (normal)',
    external_id: Cookies.get('_external_id') ? 'presente' : 'criado'
  });
  
  await sendTrackingEvent('ViewContent', {
    content_name: 'Mentor Section',
    content_category: 'mentor-bio',
    value: 1
  });
}

// Hook para usar em componentes React
export function useTracking() {
  return {
    getTrackingData,
    generateFbp,
    generateUUID,
    initializeTracking,
    sendTrackingEvent,
    sendTrackingEventMentorBio,
  };
}
