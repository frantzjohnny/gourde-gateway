import { Bell, UserRound } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h1 className="text-xl font-semibold text-primary">MoneyTracker</h1>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </button>
        <button className="flex items-center gap-2">
          <UserRound className="h-8 w-8 text-gray-600" />
        </button>
      </div>
    </div>
  );
};