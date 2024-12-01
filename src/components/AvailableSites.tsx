import { Card, ScrollArea } from "@/components/ui/scroll-area";
import { Card as CardComponent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface Site {
  id: number;
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
}

export const AvailableSites = ({ sites }: { sites: Site[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.soilType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CardComponent className="p-4">
      <h2 className="text-xl font-semibold mb-4">Available Sites</h2>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search sites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-4">
          {filteredSites.map((site) => (
            <CardComponent key={site.id} className="p-4">
              <h3 className="font-semibold text-lg">{site.name}</h3>
              <p className="text-sm text-muted-foreground">{site.address}</p>
              <div className="mt-2">
                <p className="text-sm">Available Soil: {site.soilAmount}</p>
                <p className="text-sm">Soil Type: {site.soilType}</p>
              </div>
            </CardComponent>
          ))}
        </div>
      </ScrollArea>
    </CardComponent>
  );
};