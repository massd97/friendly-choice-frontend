import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { PlusCircle, MapPin, History, Menu } from "lucide-react";
import { SiteDetails } from "@/components/SiteDetails";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Sites List Button */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10">
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
            <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
              <div className="space-y-4 pr-4">
                {sites.map((site) => (
                  <SiteDetails key={site.id} site={site} />
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          onClick={() => console.log("Check available sites")}
        >
          <MapPin className="w-5 h-5" />
          Available Sites
        </Button>

        <Button 
          variant="outline"
          className="flex items-center gap-2 h-14"
          onClick={() => console.log("Show transactions")}
        >
          <History className="w-5 h-5" />
          Transaction History
        </Button>
      </div>

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