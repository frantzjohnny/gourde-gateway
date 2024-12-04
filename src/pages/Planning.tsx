import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Planning = () => {
  const [savings, setSavings] = useState({
    current: 510.87,
    total: 8500
  });
  
  const [monthly, setMonthly] = useState({
    current: 2500,
    total: 5000
  });

  const [isEditingSavings, setIsEditingSavings] = useState(false);
  const [isEditingMonthly, setIsEditingMonthly] = useState(false);

  const handleSavingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingSavings(false);
    toast.success("Objectif d'épargne mis à jour");
  };

  const handleMonthlySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingMonthly(false);
    toast.success("Budget mensuel mis à jour");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Planification</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Objectif d'épargne</h2>
            <Button 
              variant="ghost" 
              onClick={() => setIsEditingSavings(!isEditingSavings)}
            >
              {isEditingSavings ? 'Annuler' : 'Modifier'}
            </Button>
          </div>
          
          {isEditingSavings ? (
            <form onSubmit={handleSavingsSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Montant actuel (HTG)</label>
                <Input 
                  type="number"
                  value={savings.current}
                  onChange={(e) => setSavings({...savings, current: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Objectif total (HTG)</label>
                <Input 
                  type="number"
                  value={savings.total}
                  onChange={(e) => setSavings({...savings, total: parseFloat(e.target.value)})}
                />
              </div>
              <Button type="submit">Sauvegarder</Button>
            </form>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full card-gradient"
                  style={{ width: `${(savings.current / savings.total) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>HTG {savings.current.toLocaleString()}</span>
                <span>HTG {savings.total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Budget mensuel</h2>
            <Button 
              variant="ghost" 
              onClick={() => setIsEditingMonthly(!isEditingMonthly)}
            >
              {isEditingMonthly ? 'Annuler' : 'Modifier'}
            </Button>
          </div>
          
          {isEditingMonthly ? (
            <form onSubmit={handleMonthlySubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Dépenses actuelles (HTG)</label>
                <Input 
                  type="number"
                  value={monthly.current}
                  onChange={(e) => setMonthly({...monthly, current: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Budget total (HTG)</label>
                <Input 
                  type="number"
                  value={monthly.total}
                  onChange={(e) => setMonthly({...monthly, total: parseFloat(e.target.value)})}
                />
              </div>
              <Button type="submit">Sauvegarder</Button>
            </form>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full card-gradient"
                  style={{ width: `${(monthly.current / monthly.total) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>HTG {monthly.current.toLocaleString()}</span>
                <span>HTG {monthly.total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Planning;