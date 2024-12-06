import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

// Define TypeScript interfaces for feed items
interface FeedItem {
  id: number;
  type: "transaction" | "new_site";
  from?: string;
  to?: string;
  amount?: string;
  soilType?: string;
  contactInfo?: string;
  date: string;
  status?: string;
  site?: {
    name: string;
    address: string;
    soilAmount: string;
    soilType: string;
    contactInfo: string;
  };
}

export const LiveFeed = ({ feedItems }: { feedItems: FeedItem[] }) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">アクティビティフィード</h2>
      {/* Scrollable area for feed items with dynamic height */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-4">
          {feedItems.map((item) => (
            <Card 
              key={item.id} 
              // Dynamic border color based on item type and status
              className={`p-4 border-l-4 ${
                item.type === "new_site" 
                  ? "border-l-blue-500"   // New site
                  : item.type === "transaction" && item.status === "completed"
                  ? "border-l-green-500"  // Completed transaction
                  : "border-l-yellow-500" // Pending transaction
              }`}
            >
              {/* Conditional rendering based on item type */}
              {item.type === "transaction" ? (
                // Transaction item layout
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {item.from} → {item.to}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      量: {item.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      土質: {item.soilType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      連絡先: {item.contactInfo}
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
                // New site item layout
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      現場新規登録: {item.site?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.site?.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.site?.soilAmount} of {item.site?.soilType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      連絡先: {item.site?.contactInfo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <span className="text-xs text-blue-500">
                      新規現場
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