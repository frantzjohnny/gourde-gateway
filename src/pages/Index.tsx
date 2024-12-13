import { Balance } from "@/components/Balance";
import { TransactionSummary } from "@/components/TransactionSummary";
import { RecentTransactions } from "@/components/RecentTransactions";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/90 to-primary/70">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 pb-24 max-w-md mx-auto space-y-6"
      >
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Balance />
        </motion.div>

        {/* Transaction Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TransactionSummary />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <RecentTransactions />
        </motion.div>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Index;