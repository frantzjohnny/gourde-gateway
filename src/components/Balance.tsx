import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/storage";
import { transactionStore } from "@/store/transactionStore";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Balance = () => {
  const [showBalance, setShowBalance] = useState(true);
  const currentUser = getCurrentUser();
  const balance = currentUser ? transactionStore.getBalanceByUserId(currentUser.id) : 0;

  useEffect(() => {
    if (balance < 0) {
      toast.error("Attention: Votre solde est négatif!", {
        description: `Votre solde actuel est de HTG ${balance.toLocaleString()}`,
        duration: 5000,
      });
    }
  }, [balance]);

  return (
    <motion.div 
      className="bg-white/90 rounded-2xl p-8 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-600 font-medium">Solde disponible</h2>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-medium text-gray-600 mr-2">HTG</span>
        <motion.span 
          className={cn(
            "text-4xl font-bold transition-opacity duration-200",
            !showBalance && "opacity-0",
            balance < 0 ? "text-red-600" : "text-gray-800"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: showBalance ? 1 : 0 }}
        >
          {balance.toLocaleString()}
        </motion.span>
      </div>
    </motion.div>
  );
};