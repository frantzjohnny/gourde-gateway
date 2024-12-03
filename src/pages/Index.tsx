import { Balance } from "@/components/Balance";
import { TransactionSummary } from "@/components/TransactionSummary";
import { CreditCards } from "@/components/CreditCards";
import { ProgressBar } from "@/components/ProgressBar";

const Index = () => {
  return (
    <div className="min-h-screen p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full" />
          <select className="bg-transparent text-lg font-medium focus:outline-none">
            <option>Mars</option>
            <option>Avril</option>
            <option>Mai</option>
          </select>
        </div>
        <div className="bg-primary text-white px-3 py-1 rounded-full text-sm">
          28
        </div>
      </div>

      <Balance />
      <TransactionSummary />
      <CreditCards />
      <ProgressBar 
        current={510.87}
        total={8500}
        label="Planification Total"
      />
    </div>
  );
};

export default Index;