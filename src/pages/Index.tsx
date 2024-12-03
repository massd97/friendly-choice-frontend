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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
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

  const onNewSiteSubmit = (data: Site) => {
    const newSite = {
      id: feedItems.length + 1,
      type: "new_site" as const,
      site: data,
      date: new Date().toISOString(),
    };
    setFeedItems((prev) => [newSite, ...prev]);
  };

  const onTransactionSubmit = (data: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const newTransaction = {
      id: feedItems.length + 1,
      type: "transaction" as const,
      ...data,
      date: new Date().toISOString(),
      status: "保留中",
    };
    setFeedItems((prev) => [newTransaction, ...prev]);
  };

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
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex justify-end items-center pt-16">
        <div className="flex gap-4">
          <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-14">
                <PlusCircle className="w-5 h-5" />
                新規取引
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規取引の登録</DialogTitle>
              </DialogHeader>
              <TransactionForm
                onSubmit={onTransactionSubmit}
                onClose={() => setIsTransactionDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-14">
                <PlusCircle className="w-5 h-5" />
                新規サイト登録
              </Button>
            </DialogTrigger>
            <DialogContent>
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

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">ライブフィード</TabsTrigger>
          <TabsTrigger value="sites">利用可能なサイト</TabsTrigger>
          <TabsTrigger value="transactions">取引履歴</TabsTrigger>
          <TabsTrigger value="map">土壌マップ</TabsTrigger>
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
        <TabsContent value="map">
          <SoilMap sites={sites} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;