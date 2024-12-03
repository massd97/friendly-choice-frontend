import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

// Define TypeScript interface for site data
interface Site {
  id: number;
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
  contactInfo: string;
}

export const AvailableSites = ({ sites }: { sites: Site[] }) => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // Filter sites based on search query
  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.soilType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">利用可能なサイト</h2>
      {/* Search input with icon */}
      <div className="relative mb-4">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="サイトを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      {/* Scrollable area for site cards */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-4">
          {filteredSites.map((site) => (
            <Card key={site.id} className="p-4">
              <h3 className="font-semibold text-lg">{site.name}</h3>
              <p className="text-sm text-muted-foreground">{site.address}</p>
              <div className="mt-2">
                <p className="text-sm">利用可能な土壌: {site.soilAmount}</p>
                <p className="text-sm">土壌タイプ: {site.soilType}</p>
                <p className="text-sm">連絡先: {site.contactInfo}</p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};