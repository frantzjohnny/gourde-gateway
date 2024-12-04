import { Bell, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/storage";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {location.pathname === "/profile" ? (
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <h1 className="text-xl font-bold">LAJAN SERE</h1>
        )}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            {user?.profilePicture ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};