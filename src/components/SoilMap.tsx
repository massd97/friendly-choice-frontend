import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useToast } from './ui/use-toast';

// Define TypeScript interfaces for better type safety
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

// Map container styles - defines the dimensions of the map
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center coordinates (Tokyo, Japan)
const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503
};

export const SoilMap = ({ sites }: { sites: Site[] }) => {
  // State for managing the selected site in the InfoWindow
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { toast } = useToast();

  // Filter out sites that have soil and valid location data
  const sitesWithSoil = sites.filter(site => 
    parseFloat(site.soilAmount.split(' ')[0]) > 0 && site.location
  );

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
      {/* Map title and search bar */}
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
      
      {/* Map container with responsive height */}
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
            {/* Render markers for each site with soil */}
            {sitesWithSoil.map((site) => (
              <Marker
                key={site.id}
                position={{ 
                  lat: site.location!.lat, 
                  lng: site.location!.lng 
                }}
                onClick={() => setSelectedSite(site)}
              />
            ))}

            {/* Info Window displays when a marker is clicked */}
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