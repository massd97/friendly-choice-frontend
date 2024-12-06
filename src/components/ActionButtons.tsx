import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewSiteForm } from "@/components/forms/NewSiteForm";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { Site, Transaction } from "@/types";

interface ActionButtonsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isTransactionDialogOpen: boolean;
  setIsTransactionDialogOpen: (open: boolean) => void;
  onNewSiteSubmit: (data: Omit<Site, 'id'>) => void;
  onTransactionSubmit: (data: Omit<Transaction, 'id' | 'date' | 'status' | 'type'>) => void;
}

export const ActionButtons = ({
  isDialogOpen,
  setIsDialogOpen,
  isTransactionDialogOpen,
  setIsTransactionDialogOpen,
  onNewSiteSubmit,
  onTransactionSubmit
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-end items-stretch md:items-center">
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
  );
};