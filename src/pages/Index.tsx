import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { PlusCircle, MapPin, History, Menu, Search } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSites, setShowSites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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
      type: "transaction",
      from: "Site A", 
      to: "Site B", 
      amount: "20 cubic meters", 
      date: "2024-02-20", 
      status: "completed" 
    },
    { 
      id: 2, 
      type: "new_site",
      site: sites[0],
      date: "2024-02-19"
    },
    { 
      id: 3, 
      type: "transaction",
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-16">
        <Button 
          className="flex items-center gap-2 h-14"
          onClick={() => console.log("Register new site")}
        >
          <PlusCircle className="w-5 h-5" />
          Register New Site
        </Button>

        <Button 
          variant="secondary"
          className="flex items-center gap-2 h-14"
          onClick={() => setShowSites(true)}
        >
          <MapPin className="w-5 h-5" />
          Available Sites
        </Button>

        <Button 
          variant="outline"
          className="flex items-center gap-2 h-14"
          onClick={() => setShowHistory(true)}
        >
          <History className="w-5 h-5" />
          Transaction History
        </Button>
      </div>

      {/* Available Sites Dialog */}
      <Dialog open={showSites} onOpenChange={setShowSites}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Available Sites</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4">
              {sites.map((site) => (
                <Card key={site.id} className="p-4">
                  <h3 className="font-semibold text-lg">{site.name}</h3>
                  <p className="text-sm text-muted-foreground">{site.address}</p>
                  <div className="mt-2">
                    <p className="text-sm">Available Soil: {site.soilAmount}</p>
                    <p className="text-sm">Soil Type: {site.soilType}</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4">
              {feedItems.filter(item => item.type === "transaction").map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {item.from} → {item.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amount: {item.amount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <span className={`text-xs ${
                        item.status === "completed" 
                          ? "text-green-500" 
                          : "text-yellow-500"
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Enhanced Feed */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Live Activity Feed</h2>
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-4">
            {feedItems.map((item) => (
              <Card 
                key={item.id} 
                className={`p-4 border-l-4 ${
                  item.type === "new_site" 
                    ? "border-l-blue-500"
                    : item.type === "transaction" && item.status === "completed"
                    ? "border-l-green-500"
                    : "border-l-yellow-500"
                }`}
              >
                {item.type === "transaction" ? (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {item.from} → {item.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Amount: {item.amount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <span className={`text-xs ${
                        item.status === "completed" 
                          ? "text-green-500" 
                          : "text-yellow-500"
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        New Site Registered: {item.site.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.site.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.site.soilAmount} of {item.site.soilType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <span className="text-xs text-blue-500">
                        NEW SITE
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Index;