import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from './ui/card';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Site {
  id: number;
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
  contactInfo: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export const SoilMap = ({ sites }: { sites: Site[] }) => {
  const sitesWithSoil = sites.filter(site => 
    parseFloat(site.soilAmount.split(' ')[0]) > 0 && site.location
  );

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Available Soil Sites Map</h2>
      <div style={{ height: "calc(100vh - 280px)" }}>
        <MapContainer
          center={L.latLng(51.505, -0.09)}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sitesWithSoil.map((site) => (
            <Marker 
              key={site.id} 
              position={[site.location!.lat, site.location!.lng]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{site.name}</h3>
                  <p>{site.address}</p>
                  <p>Available Soil: {site.soilAmount}</p>
                  <p>Soil Type: {site.soilType}</p>
                  <p>Contact: {site.contactInfo}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};