import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

// Define TypeScript interface for transaction data
interface Transaction {
  id: number;
  type: "transaction";
  from: string;
  to: string;
  amount: string;
  soilType: string;
  contactInfo: string;
  date: string;
  status: string;
}

export const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.soilType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to translate status text to Japanese
  const getStatusText = (status: string) => {
    return status === "completed" ? "完了" : "保留中";
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">取引履歴</h2>
      {/* Search input with icon */}
      <div className="relative mb-4">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="取引を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      {/* Scrollable area for transaction cards */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-4">
          {filteredTransactions.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {item.from} → {item.to}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    量: {item.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    土壌タイプ: {item.soilType}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    連絡先: {item.contactInfo}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('ja-JP')}
                  </p>
                  <span className={`text-xs ${
                    item.status === "completed" 
                      ? "text-green-500" 
                      : "text-yellow-500"
                  }`}>
                    {getStatusText(item.status)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};