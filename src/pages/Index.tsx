import { Balance } from "@/components/Balance";
import { TransactionSummary } from "@/components/TransactionSummary";
import { CreditCards } from "@/components/CreditCards";
import { ProgressBar } from "@/components/ProgressBar";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <Balance />
        <TransactionSummary />
        <CreditCards />
        <ProgressBar 
          current={510.87}
          total={8500}
          label="Planification Total"
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;