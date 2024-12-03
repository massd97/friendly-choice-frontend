import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TransactionForm {
  type: "request" | "accept";
  from: string;
  to: string;
  amount: string;
  soilType: string;
  contactInfo: string;
  contactName: string;
}

interface TransactionFormProps {
  onSubmit: (data: TransactionForm) => void;
  onClose: () => void;
}

export const TransactionForm = ({ onSubmit, onClose }: TransactionFormProps) => {
  const form = useForm<TransactionForm>({
    defaultValues: {
      type: "request",
      from: "",
      to: "",
      amount: "",
      soilType: "",
      contactInfo: "",
      contactName: "",
    },
  });

  const handleSubmit = (data: TransactionForm) => {
    onSubmit(data);
    form.reset();
    onClose();
    toast.success("取引が登録されました！");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>担当者名</FormLabel>
              <FormControl>
                <Input placeholder="例: 山田太郎" {...field} />
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
                <Input placeholder="例: 090-1234-5678" {...field} />
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
  );
};