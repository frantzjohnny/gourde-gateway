import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Trash2, Shield, Bell, Languages, HelpCircle, Phone } from "lucide-react";
import { getCurrentUser, getStorageData, setStorageData } from "@/lib/storage";

export default function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [profilePicture, setProfilePicture] = useState<string | undefined>(user?.profilePicture);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const data = getStorageData();
    const userIndex = data.users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      data.users[userIndex] = {
        ...data.users[userIndex],
        name,
        profilePicture
      };
      setStorageData(data);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées"
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(undefined);
    const data = getStorageData();
    const userIndex = data.users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      data.users[userIndex] = {
        ...data.users[userIndex],
        profilePicture: undefined
      };
      setStorageData(data);
      
      toast({
        title: "Photo supprimée",
        description: "Votre photo de profil a été supprimée"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50">
      <Header />
      
      <main className="max-w-md mx-auto p-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePicture} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="absolute -bottom-2 right-0 flex gap-2">
              <label className="p-2 bg-violet-500 rounded-full cursor-pointer hover:bg-violet-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {profilePicture && (
                <button
                  onClick={handleRemoveProfilePicture}
                  className="p-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold">Profil</h1>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={user.email} disabled />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nom</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-lg font-semibold">Paramètres du compte</h2>
          
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité et confidentialité
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Languages className="w-4 h-4 mr-2" />
            Langue
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Phone className="w-4 h-4 mr-2" />
            Contact
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-2" />
            Aide et support
          </Button>
        </div>
      </main>
    </div>
  );
}