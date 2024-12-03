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
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewSiteForm {
  name: string;
  address: string;
  soilAmount: string;
  soilType: string;
  contactInfo: string;
  contactName: string;
}

interface NewSiteFormProps {
  onSubmit: (data: NewSiteForm) => void;
  onClose: () => void;
}

export const NewSiteForm = ({ onSubmit, onClose }: NewSiteFormProps) => {
  const form = useForm<NewSiteForm>({
    defaultValues: {
      name: "",
      address: "",
      soilAmount: "",
      soilType: "",
      contactInfo: "",
      contactName: "",
    },
  });

  const handleSubmit = (data: NewSiteForm) => {
    onSubmit(data);
    form.reset();
    onClose();
    toast.success("新規サイトが登録されました！");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          サイトを登録
        </Button>
      </form>
    </Form>
  );
};