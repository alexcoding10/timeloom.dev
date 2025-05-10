import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet"; // Importar Leaflet

interface MapProps {
  lat: number;
  lon: number;
}

const MapComponent = ({ lat, lon }: MapProps) => {
    const customIcon = new L.Icon({
        iconUrl: "/icons/marker.svg", // Asegúrate de que esta ruta sea válida
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Anclaje del ícono
        popupAnchor: [0, -32], // Ubicación del popup
      });
  return (
    <MapContainer
      key={`${lat}-${lon}`} // Esto asegura que el mapa se actualice cuando cambian las coordenadas
      center={[lat, lon]}
      zoom={14}
      className="h-[300px] w-full rounded-lg "
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} icon={customIcon}>
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
