import { useEffect, useState } from "react";
import { transactionStore } from "@/store/transactionStore";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { getCurrentUser } from "@/lib/storage";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Transactions = () => {
  const currentUser = getCurrentUser();
  const [transactions, setTransactions] = useState(
    currentUser ? transactionStore.getTransactionsByUserId(currentUser.id) : []
  );
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const updateTransactions = () => {
      if (currentUser) {
        setTransactions(transactionStore.getTransactionsByUserId(currentUser.id));
      }
    };

    window.addEventListener("storage", updateTransactions);
    return () => window.removeEventListener("storage", updateTransactions);
  }, [currentUser]);

  const handleEditSuccess = () => {
    if (currentUser) {
      setTransactions(transactionStore.getTransactionsByUserId(currentUser.id));
    }
    setIsEditDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transactions</h1>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl p-4 shadow-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
                <p className="text-xs text-gray-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className={`font-semibold ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : "-"} HTG {transaction.amount.toLocaleString()}
                </p>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier la transaction</DialogTitle>
                    </DialogHeader>
                    {selectedTransaction && (
                      <AddTransactionForm
                        onSuccess={handleEditSuccess}
                        initialData={selectedTransaction}
                        isEditing
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Transactions;