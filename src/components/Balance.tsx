import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/storage";
import { transactionStore } from "@/store/transactionStore";

export const Balance = () => {
  const [showBalance, setShowBalance] = useState(true);
  const currentUser = getCurrentUser();
  const balance = currentUser ? transactionStore.getBalanceByUserId(currentUser.id) : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-500 font-medium">Solde en compte</h2>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-semibold mr-2">HTG</span>
        <span className={cn(
          "text-4xl font-bold transition-opacity duration-200",
          !showBalance && "opacity-0"
        )}>
          {balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
};