import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveFeed } from "@/components/LiveFeed";
import { AvailableSites } from "@/components/AvailableSites";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SoilMap } from "@/components/SoilMap";
import { useToast } from "@/components/ui/use-toast";
import { ActionButtons } from "@/components/ActionButtons";
import { Site, Transaction } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { exampleSites, exampleTransactions, generateExampleFeedItems } from "@/data/exampleData";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      <div className="container mx-auto px-4 py-6">
        <ActionButtons
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isTransactionDialogOpen={isTransactionDialogOpen}
          setIsTransactionDialogOpen={setIsTransactionDialogOpen}
          onNewSiteSubmit={onNewSiteSubmit}
          onTransactionSubmit={onTransactionSubmit}
        />
      </div>

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

          <TabsContent value="feed">
            <LiveFeed feedItems={generateExampleFeedItems()} />
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