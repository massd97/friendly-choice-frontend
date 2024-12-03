import { Button } from "@/components/ui/button";
import { PlusCircle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NewSiteForm {
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
  contactInfo: string;
}

interface TransactionForm {
  type: "request" | "accept";
  from: string;
  to: string;
  amount: string;
  soilType: string;
  contactInfo: string;
}

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [feedItems, setFeedItems] = useState<Array<{
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
  }>>([
    {
      id: 1,
      type: "transaction",
      from: "Site A",
      to: "Site B",
      amount: "20 cubic meters",
      soilType: "Sandy loam",
      contactInfo: "John Doe (555-0123)",
      date: "2024-02-20",
      status: "completed",
    },
    {
      id: 2,
      type: "new_site",
      site: {
        name: "Construction Site A",
        address: "123 Main St, City",
        soilAmount: "500 cubic meters",
        soilType: "Sandy loam",
        contactInfo: "Jane Smith (555-0124)",
      },
      date: "2024-02-19",
    },
  ]);

  const form = useForm<NewSiteForm>({
    defaultValues: {
      name: "",
      address: "",
      soilAmount: "",
      soilType: "",
      contactInfo: "",
    },
  });

  const transactionForm = useForm<TransactionForm>({
    defaultValues: {
      type: "request",
      from: "",
      to: "",
      amount: "",
      soilType: "",
      contactInfo: "",
    },
  });

  const onSubmit = (data: NewSiteForm) => {
    const newSite = {
      id: feedItems.length + 1,
      type: "new_site" as const,
      site: {
        name: data.name,
        address: data.address,
        soilAmount: data.soilAmount,
        soilType: data.soilType,
        contactInfo: data.contactInfo,
      },
      date: new Date().toISOString(),
    };

    setFeedItems((prev) => [newSite, ...prev]);
    form.reset();
    setIsDialogOpen(false);
    toast.success("New site registered successfully!");
  };

  const onTransactionSubmit = (data: TransactionForm) => {
    const newTransaction = {
      id: feedItems.length + 1,
      type: "transaction" as const,
      from: data.from,
      to: data.to,
      amount: data.amount,
      soilType: data.soilType,
      contactInfo: data.contactInfo,
      date: new Date().toISOString(),
      status: "pending",
    };

    setFeedItems((prev) => [newTransaction, ...prev]);
    transactionForm.reset();
    setIsTransactionDialogOpen(false);
    toast.success("Transaction registered successfully!");
  };

  const transactions = feedItems
    .filter((item): item is { id: number; type: "transaction"; from: string; to: string; amount: string; soilType: string; contactInfo: string; date: string; status: string; } => item.type === "transaction");
    
  const sites = feedItems
    .filter((item) => item.type === "new_site")
    .map((item) => ({
      id: item.id,
      ...item.site!
    }));

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex justify-between items-center pt-16">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-14 w-14">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
              <SheetDescription>
                アプリケーションの各セクションにアクセス
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

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
              <Form {...transactionForm}>
                <form onSubmit={transactionForm.handleSubmit(onTransactionSubmit)} className="space-y-4">
                  <FormField
                    control={transactionForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>取引タイプ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="取引タイプを選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="request">土壌要求</SelectItem>
                            <SelectItem value="accept">要求承認</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={transactionForm.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>送信元サイト</FormLabel>
                        <FormControl>
                          <Input placeholder="ソースサイトを入力" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={transactionForm.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>宛先サイト</FormLabel>
                        <FormControl>
                          <Input placeholder="宛先サイトを入力" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={transactionForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>量</FormLabel>
                        <FormControl>
                          <Input placeholder="例: 500 立方メートル" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={transactionForm.control}
                    name="soilType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>土壌タイプ</FormLabel>
                        <FormControl>
                          <Input placeholder="例: サンディローム" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={transactionForm.control}
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>連絡先情報</FormLabel>
                        <FormControl>
                          <Input placeholder="例: John Doe (555-0123)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    取引を登録
                  </Button>
                </form>
              </Form>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>サイト名</FormLabel>
                        <FormControl>
                          <Input placeholder="サイト名を入力" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>住所</FormLabel>
                        <FormControl>
                          <Input placeholder="サイトの住所を入力" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>土壌量</FormLabel>
                        <FormControl>
                          <Input placeholder="例: 500 立方メートル" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>土壌タイプ</FormLabel>
                        <FormControl>
                          <Input placeholder="例: サンディローム" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>連絡先情報</FormLabel>
                        <FormControl>
                          <Input placeholder="例: John Doe (555-0123)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    サイトを登録
                  </Button>
                </form>
              </Form>
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
