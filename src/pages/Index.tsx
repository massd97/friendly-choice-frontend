import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { PlusCircle, MapPin, History } from "lucide-react";

const Index = () => {
  // This would be replaced with real data from your backend
  const transactions = [
    { id: 1, from: "Site A", to: "Site B", amount: "20 cubic meters", date: "2024-02-20", status: "completed" },
    { id: 2, from: "Site C", to: "Site D", amount: "15 cubic meters", date: "2024-02-19", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
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

      {/* Transaction Feed */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Live Transaction Feed</h2>
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card 
                key={transaction.id} 
                className={`p-4 border-l-4 ${
                  transaction.status === "completed" 
                    ? "border-l-green-500" 
                    : "border-l-yellow-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {transaction.from} → {transaction.to}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Amount: {transaction.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                    <span className={`text-xs ${
                      transaction.status === "completed" 
                        ? "text-green-500" 
                        : "text-yellow-500"
                    }`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Index;