import { Button } from "@/components/ui/button";
import { PlusCircle, Menu, Search } from "lucide-react";
import { SiteDetails } from "@/components/SiteDetails";
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

interface NewSiteForm {
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      type: "transaction" as const,
      from: "Site A",
      to: "Site B",
      amount: "20 cubic meters",
      date: "2024-02-20",
      status: "completed",
    },
    {
      id: 2,
      type: "new_site" as const,
      site: {
        id: 1,
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

  const onSubmit = (data: NewSiteForm) => {
    const newSite = {
      id: feedItems.length + 1,
      type: "new_site" as const,
      site: {
        id: feedItems.length + 1,
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

  const sites = feedItems
    .filter((item) => item.type === "new_site")
    .map((item) => item.site);

  const transactions = feedItems.filter(
    (item): item is (typeof item & { type: "transaction" }) =>
      item.type === "transaction"
  );

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 pt-16">
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