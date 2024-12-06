import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useToast } from './ui/use-toast';

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

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503
};

// Custom marker component to support different colors
const Marker = ({ position, color, onClick }: { 
  position: google.maps.LatLngLiteral, 
  color: string,
  onClick: () => void 
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        cursor: 'pointer',
      }}
    >
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill={color}
        stroke="#000000"
        strokeWidth="1"
      >
        <path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 24 12 24s12-15 12-24c0-6.617-5.383-12-12-12z" />
      </svg>
    </div>
  );
};

export const SoilMap = ({ sites }: { sites: Site[] }) => {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { toast } = useToast();

  // Filter out sites that have soil and valid location data
  const sitesWithSoil = sites.filter(site => 
    parseFloat(site.soilAmount.split(' ')[0]) > 0 && site.location
  );

  // Determine marker color based on soil amount
  const getMarkerColor = (soilAmount: string) => {
    const amount = parseFloat(soilAmount.split(' ')[0]);
    return amount > 1000 ? '#2563eb' : '#dc2626'; // blue for large amounts, red for small
  };

  const handleSearch = () => {
    if (!mapInstance || !searchAddress) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchAddress }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        mapInstance.setCenter(location);
        mapInstance.setZoom(15);
        toast({
          title: "場所が見つかりました",
          description: results[0].formatted_address,
        });
      } else {
        toast({
          title: "エラー",
          description: "住所が見つかりませんでした。",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="w-full p-2 md:p-4">
      <div className="mb-4 px-2">
        <h2 className="text-xl font-semibold mb-4">マップ</h2>
        <div className="flex gap-2">
          <Input
            placeholder="住所を検索..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="max-w-md"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative w-full h-[50vh] md:h-[calc(100vh-280px)] rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={5}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
            onLoad={(map) => setMapInstance(map)}
          >
            {sitesWithSoil.map((site) => (
              <Marker
                key={site.id}
                position={{ 
                  lat: site.location!.lat, 
                  lng: site.location!.lng 
                }}
                color={getMarkerColor(site.soilAmount)}
                onClick={() => setSelectedSite(site)}
              />
            ))}

            {selectedSite && (
              <InfoWindow
                position={{
                  lat: selectedSite.location!.lat,
                  lng: selectedSite.location!.lng
                }}
                onCloseClick={() => setSelectedSite(null)}
              >
                <div className="p-3">
                  <h3 className="font-bold text-base mb-2">{selectedSite.name}</h3>
                  <p className="text-sm mb-1">{selectedSite.address}</p>
                  <p className="text-sm mb-1">利用可能な土壌: {selectedSite.soilAmount}</p>
                  <p className="text-sm mb-1">土壌タイプ: {selectedSite.soilType}</p>
                  <p className="text-sm mb-1">担当者: {selectedSite.contactName}</p>
                  <p className="text-sm">連絡先: {selectedSite.contactInfo}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};