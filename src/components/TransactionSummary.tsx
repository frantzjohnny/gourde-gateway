import { ArrowDown, ArrowUp } from "lucide-react";

export const TransactionSummary = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-100 p-2 rounded-full">
            <ArrowUp className="text-green-600" size={20} />
          </div>
          <span className="text-gray-500">Recettes</span>
        </div>
        <div className="text-xl font-semibold">
          HTG 24,000.00
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-100 p-2 rounded-full">
            <ArrowDown className="text-red-600" size={20} />
          </div>
          <span className="text-gray-500">Dépenses</span>
        </div>
        <div className="text-xl font-semibold">
          HTG 5,833.33
        </div>
      </div>
    </div>
  );
};