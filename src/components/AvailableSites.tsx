import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define TypeScript interface for site data
interface Site {
  id: number;
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
  contactInfo: string;
  maxDumpSize?: string;
  period?: string;
  hasShortHaulage?: string;
}

export const AvailableSites = ({ sites }: { sites: Site[] }) => {
  // State for search functionality and dialog
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // Filter sites based on search query
  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.soilType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">利用可能残土</h2>
        {/* Search input with icon */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="現場を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        {/* Scrollable area for site cards */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-4">
            {filteredSites.map((site) => (
              <Card 
                key={site.id} 
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setSelectedSite(site)}
              >
                <h3 className="font-semibold text-lg">{site.name}</h3>
                <p className="text-sm text-muted-foreground">{site.address}</p>
                <div className="mt-2">
                  <p className="text-sm">利用可能な土壌: {site.soilAmount}</p>
                  <p className="text-sm">土質: {site.soilType}</p>
                  <p className="text-sm">連絡先: {site.contactInfo}</p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Dialog open={!!selectedSite} onOpenChange={() => setSelectedSite(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedSite?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">現場情報</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">住所:</span> {selectedSite?.address}</p>
                <p><span className="font-medium">利用可能な土壌:</span> {selectedSite?.soilAmount}</p>
                <p><span className="font-medium">土質:</span> {selectedSite?.soilType}</p>
                <p><span className="font-medium">連絡先:</span> {selectedSite?.contactInfo}</p>
                {selectedSite?.maxDumpSize && (
                  <p><span className="font-medium">侵入可能最大ダンプサイズ:</span> {selectedSite.maxDumpSize}</p>
                )}
                {selectedSite?.period && (
                  <p><span className="font-medium">期間:</span> {selectedSite.period}</p>
                )}
                {selectedSite?.hasShortHaulage && (
                  <p><span className="font-medium">小運搬有無:</span> {selectedSite.hasShortHaulage}</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};