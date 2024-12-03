import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProgressBar } from "@/components/ProgressBar";

const Planning = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Planification</h1>
        <ProgressBar 
          current={510.87}
          total={8500}
          label="Objectif d'épargne"
        />
        <ProgressBar 
          current={2500}
          total={5000}
          label="Budget mensuel"
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default Planning;