import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AddressService {
  async search(query: string) {
    if (!query) {
      return { error: 'Se requiere una dirección' };
    }
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=1&countrycodes=ES&accept-language=es&q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      // Filtrar solo la info útil
      return data.map((place: any) => ({
        display_name: place.display_name, // Nombre de la dirección
        lat: place.lat, // Latitud
        lon: place.lon, // Longitud
      }));
    } catch (error) {
      return { error: 'Error al obtener direcciones' };
    }
  }
}
