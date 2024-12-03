import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getStorageData, setStorageData, setCurrentUser } from "@/lib/storage";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const data = getStorageData();
    
    if (data.users.some(u => u.email === email)) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Cet email est déjà utilisé"
      });
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
    };

    data.users.push(newUser);
    setStorageData(data);
    setCurrentUser(newUser.id);
    
    toast({
      title: "Compte créé",
      description: "Bienvenue sur MoneyTracker!"
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-violet-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-gray-600">Rejoignez MoneyTracker</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            S'inscrire
          </Button>
        </form>

        <p className="text-center">
          Déjà un compte?{" "}
          <Button variant="link" onClick={() => navigate("/login")}>
            Se connecter
          </Button>
        </p>
      </div>
    </div>
  );
}