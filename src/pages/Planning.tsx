import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface PlanningItem {
  id: string;
  name: string;
  current: number;
  total: number;
}

const Planning = () => {
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>([
    {
      id: "savings",
      name: "Objectif d'épargne",
      current: 510.87,
      total: 8500
    },
    {
      id: "monthly",
      name: "Budget mensuel",
      current: 2500,
      total: 5000
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newPlanning, setNewPlanning] = useState({
    name: "",
    current: 0,
    total: 0
  });

  const handleSubmit = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    setEditingId(null);
    toast.success("Planification mise à jour");
  };

  const handleDelete = (id: string) => {
    setPlanningItems(items => items.filter(item => item.id !== id));
    toast.success("Planification supprimée");
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `planning-${Date.now()}`;
    setPlanningItems(items => [...items, {
      id: newId,
      ...newPlanning
    }]);
    setShowNewForm(false);
    setNewPlanning({ name: "", current: 0, total: 0 });
    toast.success("Nouvelle planification ajoutée");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Planification</h1>
          <Button 
            variant="outline"
            onClick={() => setShowNewForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouveau
          </Button>
        </div>

        {showNewForm && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <form onSubmit={handleAddNew} className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Nom</label>
                <Input 
                  value={newPlanning.name}
                  onChange={(e) => setNewPlanning({...newPlanning, name: e.target.value})}
                  placeholder="Nom de la planification"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Montant actuel (HTG)</label>
                <Input 
                  type="number"
                  value={newPlanning.current}
                  onChange={(e) => setNewPlanning({...newPlanning, current: parseFloat(e.target.value)})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Objectif total (HTG)</label>
                <Input 
                  type="number"
                  value={newPlanning.total}
                  onChange={(e) => setNewPlanning({...newPlanning, total: parseFloat(e.target.value)})}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Ajouter</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewForm(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        )}
        
        {planningItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                >
                  {editingId === item.id ? 'Annuler' : 'Modifier'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {editingId === item.id ? (
              <form onSubmit={(e) => handleSubmit(item.id, e)} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Montant actuel (HTG)</label>
                  <Input 
                    type="number"
                    value={item.current}
                    onChange={(e) => {
                      setPlanningItems(items => 
                        items.map(i => 
                          i.id === item.id 
                            ? {...i, current: parseFloat(e.target.value)}
                            : i
                        )
                      );
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Objectif total (HTG)</label>
                  <Input 
                    type="number"
                    value={item.total}
                    onChange={(e) => {
                      setPlanningItems(items => 
                        items.map(i => 
                          i.id === item.id 
                            ? {...i, total: parseFloat(e.target.value)}
                            : i
                        )
                      );
                    }}
                  />
                </div>
                <Button type="submit">Sauvegarder</Button>
              </form>
            ) : (
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full card-gradient"
                    style={{ width: `${(item.current / item.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>HTG {item.current.toLocaleString()}</span>
                  <span>HTG {item.total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Planning;