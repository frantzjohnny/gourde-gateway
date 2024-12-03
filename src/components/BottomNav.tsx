import { Home, List, Plus, PiggyBank, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTransactionForm } from "./AddTransactionForm";

export const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link to="/" className={`flex flex-col items-center ${location.pathname === "/" ? "text-primary" : "text-gray-500"}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Accueil</span>
        </Link>
        
        <Link to="/transactions" className={`flex flex-col items-center ${location.pathname === "/transactions" ? "text-primary" : "text-gray-500"}`}>
          <List size={24} />
          <span className="text-xs mt-1">Transactions</span>
        </Link>
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center -mt-8">
              <div className="bg-primary rounded-full p-4">
                <Plus size={24} className="text-white" />
              </div>
              <span className="text-xs mt-1 text-primary">Ajouter</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une transaction</DialogTitle>
            </DialogHeader>
            <AddTransactionForm onSuccess={() => {
              const closeButton = document.querySelector('[aria-label="Close"]');
              if (closeButton instanceof HTMLElement) {
                closeButton.click();
              }
            }} />
          </DialogContent>
        </Dialog>
        
        <Link to="/planning" className={`flex flex-col items-center ${location.pathname === "/planning" ? "text-primary" : "text-gray-500"}`}>
          <PiggyBank size={24} />
          <span className="text-xs mt-1">Planning</span>
        </Link>
        
        <Link to="/more" className={`flex flex-col items-center ${location.pathname === "/more" ? "text-primary" : "text-gray-500"}`}>
          <MoreHorizontal size={24} />
          <span className="text-xs mt-1">Plus</span>
        </Link>
      </div>
    </nav>
  );
};