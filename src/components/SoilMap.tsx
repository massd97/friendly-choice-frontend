import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

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

// Map container styles
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (Tokyo, Japan)
const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503
};

export const SoilMap = ({ sites }: { sites: Site[] }) => {
  // State for handling InfoWindow
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // Filter sites that have soil and location data
  const sitesWithSoil = sites.filter(site => 
    parseFloat(site.soilAmount.split(' ')[0]) > 0 && site.location
  );

  return (
    <div className="w-full p-2 md:p-4">
      {/* Map title */}
      <h2 className="text-xl font-semibold mb-4 px-2">土壌サイトマップ</h2>
      
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
          >
            {/* Render markers for each site */}
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

            {/* Info Window for selected site */}
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