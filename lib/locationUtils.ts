// lib/locationUtils.ts
export interface LocationData {
  ip: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
}

export async function getLocationFromIP(ip: string): Promise<LocationData> {
  try {
    console.log(`Buscando localização para IP: ${ip}`);
    
    const accessKey = process.env.IPAPI_TOKEN;
    const url = `https://apiip.net/api/check?ip=${ip}&accessKey=${accessKey}`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    const locationData: LocationData = {
      ip,
      city: result.city,
      state: result.regionName,
      country: result.countryName,
      zip_code: result.zipCode
    };

    console.log('Localização encontrada:', locationData);
    return locationData;

  } catch (error: any) {
    console.error('Erro ao buscar localização:', error.message);
    
    return {
      ip,
      city: 'Unknown',
      state: 'Unknown',
      country: 'Unknown',
      zip_code: 'Unknown'
    };
  }
}