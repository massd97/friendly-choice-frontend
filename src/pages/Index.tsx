import { Button } from "@/components/ui/button";
import { PlusCircle, Menu, Search } from "lucide-react";
import { SiteDetails } from "@/components/SiteDetails";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveFeed } from "@/components/LiveFeed";
import { AvailableSites } from "@/components/AvailableSites";
import { TransactionHistory } from "@/components/TransactionHistory";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // This would be replaced with real data from your backend
  const sites = [
    { 
      id: 1, 
      name: "Construction Site A",
      address: "123 Main St, City",
      soilAmount: "500 cubic meters",
      soilType: "Sandy loam"
    },
    { 
      id: 2, 
      name: "Construction Site B",
      address: "456 Oak St, City",
      soilAmount: "300 cubic meters",
      soilType: "Clay"
    },
  ];

  const feedItems = [
    { 
      id: 1, 
      type: "transaction" as const,
      from: "Site A", 
      to: "Site B", 
      amount: "20 cubic meters", 
      date: "2024-02-20", 
      status: "completed" 
    },
    { 
      id: 2, 
      type: "new_site" as const,
      site: sites[0],
      date: "2024-02-19"
    },
    { 
      id: 3, 
      type: "transaction" as const,
      from: "Site C", 
      to: "Site D", 
      amount: "15 cubic meters", 
      date: "2024-02-19", 
      status: "pending" 
    },
  ];

  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.soilType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const transactions = feedItems.filter(
    (item): item is (typeof feedItems[0] & { type: "transaction" }) => 
    item.type === "transaction"
  );

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Sites List Button */}
      <div className="fixed left-4 top-4 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Available Sites</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-4 pr-4">
                {filteredSites.map((site) => (
                  <SiteDetails key={site.id} site={site} />
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 pt-16">
        <Button 
          className="flex items-center gap-2 h-14"
          onClick={() => console.log("Register new site")}
        >
          <PlusCircle className="w-5 h-5" />
          Register New Site
        </Button>
      </div>

      {/* Tabs Interface */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Live Feed</TabsTrigger>
          <TabsTrigger value="sites">Available Sites</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <LiveFeed feedItems={feedItems} />
        </TabsContent>
        <TabsContent value="sites">
          <AvailableSites sites={sites} />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionHistory transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;