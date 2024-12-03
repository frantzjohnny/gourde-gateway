import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getStorageData, setCurrentUser } from "@/lib/storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const data = getStorageData();
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user.id);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MoneyTracker!"
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Email ou mot de passe incorrect"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-violet-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-gray-600">Bienvenue sur MoneyTracker</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>

        <p className="text-center">
          Pas encore de compte?{" "}
          <Button variant="link" onClick={() => navigate("/register")}>
            S'inscrire
          </Button>
        </p>
      </div>
    </div>
  );
}