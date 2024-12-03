import { useEffect, useState } from "react";
import { transactionStore } from "@/store/transactionStore";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const Transactions = () => {
  const [transactions, setTransactions] = useState(transactionStore.getTransactions());

  useEffect(() => {
    const updateTransactions = () => {
      setTransactions(transactionStore.getTransactions());
    };

    window.addEventListener("storage", updateTransactions);
    return () => window.removeEventListener("storage", updateTransactions);
  }, []);

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
              <p className={`font-semibold ${
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "income" ? "+" : "-"} HTG {transaction.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Transactions;