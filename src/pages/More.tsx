import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import CreditCardManager from "@/components/CreditCardManager";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "@/lib/storage";

const More = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(undefined);
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Plus d'options</h1>
        <div className="space-y-6">
          <CreditCardManager />
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Paramètres</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/profile")}
              >
                Profil
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Sécurité
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default More;