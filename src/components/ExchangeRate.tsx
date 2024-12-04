import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

interface ExchangeRateResponse {
  rates: {
    HTG: number;
  };
}

export const ExchangeRate = () => {
  const [usdAmount, setUsdAmount] = useState("");

  const { data: rate, isLoading, error } = useQuery({
    queryKey: ["exchangeRate"],
    queryFn: async () => {
      const response = await fetch(EXCHANGE_API_URL);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du taux de change");
      }
      const data: ExchangeRateResponse = await response.json();
      return data.rates.HTG;
    },
    refetchInterval: 1000 * 60 * 60, // Rafraîchir toutes les heures
  });

  const calculateHTG = () => {
    if (!rate || !usdAmount) return "";
    return (parseFloat(usdAmount) * rate).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-lg mt-6 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-lg mt-6 text-center text-red-500">
        Impossible de charger le taux de change
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-2">Taux de Change</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500">1 USD</span>
        <span className="font-bold">{rate?.toFixed(2)} HTG</span>
      </div>
      <div className="space-y-2">
        <div className="flex gap-4 items-center">
          <Input
            type="number"
            placeholder="Montant en USD"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            className="w-full"
          />
        </div>
        {usdAmount && (
          <div className="text-right font-semibold">
            = {calculateHTG()} HTG
          </div>
        )}
      </div>
    </div>
  );
};