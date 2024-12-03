import { Home, List, PlusCircle, BarChart3, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xs">Accueil</span>
        </Link>
        <Link to="/transactions" className="flex flex-col items-center gap-1">
          <List className="h-6 w-6 text-gray-500" />
          <span className="text-xs">Liste</span>
        </Link>
        <button className="flex flex-col items-center gap-1 -mt-8">
          <div className="bg-primary rounded-full p-4 shadow-lg">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
        </button>
        <Link to="/planning" className="flex flex-col items-center gap-1">
          <BarChart3 className="h-6 w-6 text-gray-500" />
          <span className="text-xs">Planning</span>
        </Link>
        <button className="flex flex-col items-center gap-1">
          <MoreHorizontal className="h-6 w-6 text-gray-500" />
          <span className="text-xs">Plus</span>
        </button>
      </div>
    </nav>
  );
};