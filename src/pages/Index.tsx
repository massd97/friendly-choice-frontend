import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveFeed } from "@/components/LiveFeed";
import { AvailableSites } from "@/components/AvailableSites";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SoilMap } from "@/components/SoilMap";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewSiteForm } from "@/components/forms/NewSiteForm";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { FeedItem, Transaction, Site } from "@/types";

const Index = () => {
  // Dialog state management
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  
  // Feed items state management
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: 1,
      type: "transaction",
      from: "サイトA",
      to: "サイトB",
      amount: "20 立方メートル",
      soilType: "サンディローム",
      contactInfo: "090-1234-5678",
      contactName: "山田太郎",
      date: "2024-02-20",
      status: "完了",
    },
    {
      id: 2,
      type: "new_site",
      site: {
        name: "建設現場A",
        address: "東京都渋谷区123-45",
        soilAmount: "500 立方メートル",
        soilType: "サンディローム",
        contactInfo: "090-8765-4321",
        contactName: "鈴木花子",
      } as Site,
      date: "2024-02-19",
    },
  ]);

  // Form submission handlers
  const onNewSiteSubmit = (data: Site) => {
    const newSite = {
      id: feedItems.length + 1,
      type: "new_site" as const,
      site: data,
      date: new Date().toISOString(),
    };
    setFeedItems((prev) => [newSite, ...prev]);
    setIsDialogOpen(false);
  };

  // Updated transaction submission handler to correctly format transaction data
  const onTransactionSubmit = (data: Omit<Transaction, "id" | "date" | "status" | "type">) => {
    const newTransaction = {
      id: feedItems.length + 1,
      type: "transaction" as const,
      from: data.from,
      to: data.to,
      amount: data.amount,
      soilType: data.soilType,
      contactInfo: data.contactInfo,
      contactName: data.contactName,
      date: new Date().toISOString(),
      status: "保留中",
    };
    setFeedItems((prev) => [newTransaction, ...prev]);
    setIsTransactionDialogOpen(false);
  };

  // Filter transactions and sites from feed items
  const transactions = feedItems.filter(
    (item): item is Transaction => item.type === "transaction"
  );

  const sites = feedItems
    .filter((item) => item.type === "new_site")
    .map((item) => ({
      id: item.id,
      ...item.site!,
    }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header section with action buttons */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-end items-stretch md:items-center">
          {/* Transaction Dialog */}
          <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-12">
                <PlusCircle className="w-5 h-5" />
                新規取引
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>新規取引の登録</DialogTitle>
              </DialogHeader>
              <TransactionForm
                onSubmit={onTransactionSubmit}
                onClose={() => setIsTransactionDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* New Site Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-12">
                <PlusCircle className="w-5 h-5" />
                新規サイト登録
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>新規サイトの登録</DialogTitle>
              </DialogHeader>
              <NewSiteForm
                onSubmit={onNewSiteSubmit}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main content with tabs */}
      <div className="container mx-auto px-4 pb-6">
        <Tabs defaultValue="feed" className="w-full space-y-6">
          {/* Tab navigation */}
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="feed" className="text-sm md:text-base">
              ライブフィード
            </TabsTrigger>
            <TabsTrigger value="sites" className="text-sm md:text-base">
              利用可能なサイト
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-sm md:text-base">
              取引履歴
            </TabsTrigger>
            <TabsTrigger value="map" className="text-sm md:text-base">
              土壌マップ
            </TabsTrigger>
          </TabsList>

          {/* Tab content */}
          <TabsContent value="feed">
            <LiveFeed feedItems={feedItems} />
          </TabsContent>
          <TabsContent value="sites">
            <AvailableSites sites={sites} />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionHistory transactions={transactions} />
          </TabsContent>
          <TabsContent value="map">
            <SoilMap sites={sites} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;