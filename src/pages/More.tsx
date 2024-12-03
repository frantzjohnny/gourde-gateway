import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { CreditCards } from "@/components/CreditCards";

const More = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 pb-24 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Plus d'options</h1>
        <div className="space-y-6">
          <CreditCards />
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Paramètres</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Profil
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Sécurité
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
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