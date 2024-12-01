import { Card, ScrollArea } from "@/components/ui/scroll-area";
import { Card as CardComponent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: number;
  type: "transaction";
  from: string;
  to: string;
  amount: string;
  date: string;
  status: string;
}

export const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(transaction => 
    transaction.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.amount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CardComponent className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-4">
          {filteredTransactions.map((item) => (
            <CardComponent key={item.id} className="p-4">
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
            </CardComponent>
          ))}
        </div>
      </ScrollArea>
    </CardComponent>
  );
};