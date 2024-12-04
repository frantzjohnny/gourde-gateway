import { ArrowDown, ArrowUp } from "lucide-react";
import { transactionStore } from "@/store/transactionStore";
import { getCurrentUser } from "@/lib/storage";

export const TransactionSummary = () => {
  const currentUser = getCurrentUser();
  
  const calculateTotals = () => {
    if (!currentUser) return { income: 0, expense: 0 };
    
    const transactions = transactionStore.getTransactionsByUserId(currentUser.id);
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount;
        } else {
          acc.expense += transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-100 p-2 rounded-full">
            <ArrowUp className="text-green-600" size={20} />
          </div>
          <span className="text-gray-500">Recettes</span>
        </div>
        <div className="text-xl font-semibold">
          HTG {totals.income.toLocaleString()}
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-100 p-2 rounded-full">
            <ArrowDown className="text-red-600" size={20} />
          </div>
          <span className="text-gray-500">Dépenses</span>
        </div>
        <div className="text-xl font-semibold">
          HTG {totals.expense.toLocaleString()}
        </div>
      </div>
    </div>
  );
};