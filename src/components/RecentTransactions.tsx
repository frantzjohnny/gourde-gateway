import { transactionStore } from "@/store/transactionStore";
import { getCurrentUser } from "@/lib/storage";
import { ArrowDown, ArrowUp } from "lucide-react";

export const RecentTransactions = () => {
  const currentUser = getCurrentUser();
  const transactions = currentUser 
    ? transactionStore.getTransactionsByUserId(currentUser.id).slice(-3)
    : [];

  return (
    <div className="bg-white/90 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Résumé</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {transaction.type === 'income' 
                  ? <ArrowUp className="text-green-600" size={20} />
                  : <ArrowDown className="text-yellow-600" size={20} />
                }
              </div>
              <div>
                <div className="font-medium text-gray-800">{transaction.description}</div>
                <div className="text-sm text-gray-500">{transaction.category}</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'} HTG {transaction.amount.toLocaleString()}
              </span>
              <div className="text-xs text-gray-400">
                {new Date(transaction.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Aucune transaction récente
          </div>
        )}
      </div>
    </div>
  );
};