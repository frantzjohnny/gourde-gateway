import { ArrowDown, ArrowUp } from "lucide-react";
import { transactionStore } from "@/store/transactionStore";
import { getCurrentUser } from "@/lib/storage";
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-100 p-2.5 rounded-full">
            <ArrowUp className="text-green-600" size={20} />
          </div>
          <span className="text-gray-500 font-medium">Recettes</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          HTG {totals.income.toLocaleString()}
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-100 p-2.5 rounded-full">
            <ArrowDown className="text-red-600" size={20} />
          </div>
          <span className="text-gray-500 font-medium">Dépenses</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          HTG {totals.expense.toLocaleString()}
        </div>
      </motion.div>
    </div>
  );
};