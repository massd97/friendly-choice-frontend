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

  // Fetch data using React Query
  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: api.getSites,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: api.getTransactions,
  });

  // Combine sites and transactions for the feed
  const feedItems: FeedItem[] = [
    ...transactions.map(transaction => ({
      ...transaction,
      type: 'transaction' as const,
    })),
    ...sites.map(site => ({
      id: site.id,
      type: 'new_site' as const,
      site,
      date: new Date().toISOString(),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Mutations for creating new sites and transactions
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

  // Form submission handlers
  const onNewSiteSubmit = (data: Omit<Site, 'id'>) => {
    createSiteMutation.mutate(data);
  };

  const onTransactionSubmit = (data: Omit<Transaction, 'id' | 'date' | 'status' | 'type'>) => {
    createTransactionMutation.mutate(data);
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
