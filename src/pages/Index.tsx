import { Button } from "@/components/ui/button";
import { PlusCircle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveFeed } from "@/components/LiveFeed";
import { AvailableSites } from "@/components/AvailableSites";
import { TransactionHistory } from "@/components/TransactionHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
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
}

interface TransactionForm {
  type: "request" | "accept";
  from: string;
  to: string;
  amount: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [feedItems, setFeedItems] = useState<Array<{
    id: number;
    type: "transaction" | "new_site";
    from?: string;
    to?: string;
    amount?: string;
    date: string;
    status?: string;
    site?: {
      name: string;
      address: string;
      soilAmount: string;
      soilType: string;
    };
  }>>([
    {
      id: 1,
      type: "transaction",
      from: "Site A",
      to: "Site B",
      amount: "20 cubic meters",
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
    },
  });

  const transactionForm = useForm<TransactionForm>({
    defaultValues: {
      type: "request",
      from: "",
      to: "",
      amount: "",
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
      date: new Date().toISOString(),
      status: "pending",
    };

    setFeedItems((prev) => [newTransaction, ...prev]);
    transactionForm.reset();
    setIsTransactionDialogOpen(false);
    toast.success("Transaction registered successfully!");
  };

  const transactions = feedItems.filter((item) => item.type === "transaction");
  const sites = feedItems
    .filter((item) => item.type === "new_site")
    .map((item) => item.site!);

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
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Access different sections of the application
              </SheetDescription>
            </SheetHeader>
            {/* Add menu items here */}
          </SheetContent>
        </Sheet>

        <div className="flex gap-4">
          <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-14">
                <PlusCircle className="w-5 h-5" />
                New Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Transaction</DialogTitle>
              </DialogHeader>
              <Form {...transactionForm}>
                <form onSubmit={transactionForm.handleSubmit(onTransactionSubmit)} className="space-y-4">
                  <FormField
                    control={transactionForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="request">Request Soil</SelectItem>
                            <SelectItem value="accept">Accept Request</SelectItem>
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
                        <FormLabel>From Site</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter source site" {...field} />
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
                        <FormLabel>To Site</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter destination site" {...field} />
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
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500 cubic meters" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Register Transaction
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-14">
                <PlusCircle className="w-5 h-5" />
                Register New Site
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Site</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter site name" {...field} />
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
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter site address" {...field} />
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
                        <FormLabel>Soil Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500 cubic meters" {...field} />
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
                        <FormLabel>Soil Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sandy loam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Register Site
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Live Feed</TabsTrigger>
          <TabsTrigger value="sites">Available Sites</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default Index;