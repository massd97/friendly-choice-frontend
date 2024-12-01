import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface FeedItem {
  id: number;
  type: "transaction" | "new_site";
  from?: string;
  to?: string;
  amount?: string;
  date: string;
  status?: string;
  site?: {
    name: string;
    address: string;
    soilAmount: string;
    soilType: string;
  };
}

export const LiveFeed = ({ feedItems }: { feedItems: FeedItem[] }) => {
  return (
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
                      {item.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      New Site Registered: {item.site?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.site?.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.site?.soilAmount} of {item.site?.soilType}
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
  );
};