import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  contactName: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export const SoilMap = ({ sites }: { sites: Site[] }) => {
  const sitesWithSoil = sites.filter(site => 
    parseFloat(site.soilAmount.split(' ')[0]) > 0 && site.location
  );

  // Center on Tokyo, Japan
  const defaultCenter = {
    lat: 35.6762,
    lng: 139.6503
  };

  return (
    <div className="p-2 md:p-4 w-full">
      <h2 className="text-xl font-semibold mb-4 px-2">土壌サイトマップ</h2>
      <div className="relative w-full h-[50vh] md:h-[calc(100vh-280px)] z-0 rounded-lg overflow-hidden">
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={5}
          scrollWheelZoom={true}
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
                <div className="p-3">
                  <h3 className="font-bold text-base mb-2">{site.name}</h3>
                  <p className="text-sm mb-1">{site.address}</p>
                  <p className="text-sm mb-1">利用可能な土壌: {site.soilAmount}</p>
                  <p className="text-sm mb-1">土壌タイプ: {site.soilType}</p>
                  <p className="text-sm mb-1">担当者: {site.contactName}</p>
                  <p className="text-sm">連絡先: {site.contactInfo}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};