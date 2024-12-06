import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveFeed } from "@/components/LiveFeed";
import { AvailableSites } from "@/components/AvailableSites";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SoilMap } from "@/components/SoilMap";
import { useToast } from "@/components/ui/use-toast";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Index = () => {
  // Dialog state management
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Example sites data
  const exampleSites: Site[] = [
    {
      id: 1,
      name: "東京建設現場A",
      address: "東京都新宿区西新宿2-8-1",
      soilAmount: "1000 m³",
      soilType: "黒土",
      contactInfo: "03-1234-5678",
      contactName: "田中太郎",
      location: { lat: 35.6894, lng: 139.6917 }
    },
    {
      id: 2,
      name: "横浜工事現場B",
      address: "神奈川県横浜市西区みなとみらい2-3-1",
      soilAmount: "750 m³",
      soilType: "赤土",
      contactInfo: "045-1234-5678",
      contactName: "鈴木一郎",
      location: { lat: 35.4567, lng: 139.6325 }
    },
    {
      id: 3,
      name: "千葉建設サイトC",
      address: "千葉県千葉市中央区中央4-5-1",
      soilAmount: "500 m³",
      soilType: "山土",
      contactInfo: "043-1234-5678",
      contactName: "佐藤花子",
      location: { lat: 35.6089, lng: 140.1234 }
    }
  ];

  // Example transactions data
  const exampleTransactions: Transaction[] = [
    {
      id: 1,
      type: "transaction",
      from: "東京建設現場A",
      to: "横浜工事現場B",
      amount: "200 m³",
      soilType: "黒土",
      contactInfo: "03-1234-5678",
      date: "2024-03-10",
      status: "completed"
    },
    {
      id: 2,
      type: "transaction",
      from: "千葉建設サイトC",
      to: "東京建設現場A",
      amount: "150 m³",
      soilType: "山土",
      contactInfo: "043-1234-5678",
      date: "2024-03-09",
      status: "pending"
    }
  ];

  // Example feed items combining both transactions and new site registrations
  const exampleFeedItems: FeedItem[] = [
    ...exampleTransactions,
    {
      id: 3,
      type: "new_site",
      date: "2024-03-08",
      site: exampleSites[0]
    },
    {
      id: 4,
      type: "new_site",
      date: "2024-03-07",
      site: exampleSites[1]
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Mock queries to use example data
  const { data: sites = exampleSites } = useQuery({
    queryKey: ['sites'],
    queryFn: () => Promise.resolve(exampleSites),
  });

  const { data: transactions = exampleTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => Promise.resolve(exampleTransactions),
  });

  // Form submission handlers
  const createSiteMutation = useMutation({
    mutationFn: api.createSite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setIsDialogOpen(false);
      toast({
        title: "サイトが登録されました",
        description: "新しいサイトが正常に登録されました。",
      });
    },
  });

  const createTransactionMutation = useMutation({
    mutationFn: api.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setIsTransactionDialogOpen(false);
      toast({
        title: "取引が登録されました",
        description: "新しい取引が正常に登録されました。",
      });
    },
  });

  const onNewSiteSubmit = (data: Omit<Site, 'id'>) => {
    createSiteMutation.mutate(data);
  };

  const onTransactionSubmit = (data: Omit<Transaction, 'id' | 'date' | 'status' | 'type'>) => {
    createTransactionMutation.mutate({
      ...data,
      type: 'transaction'
    });
  };

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
            <LiveFeed feedItems={exampleFeedItems} />
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