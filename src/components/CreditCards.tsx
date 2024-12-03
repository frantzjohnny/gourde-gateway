interface CreditCard {
  bank: string;
  amount: number;
  status: "Automatique" | "En attente";
  color: string;
}

export const CreditCards = () => {
  const cards: CreditCard[] = [
    { bank: "Sogebank", amount: 9500, status: "Automatique", color: "bg-red-500" },
    { bank: "Unibank", amount: 1200, status: "Automatique", color: "bg-purple-500" },
    { bank: "BNC", amount: 800, status: "En attente", color: "bg-orange-500" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">Cartes de Crédit</h2>
      <div className="space-y-4">
        {cards.map((card) => (
          <div key={card.bank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${card.color}`} />
              <div>
                <div className="font-medium">{card.bank}</div>
                <div className="text-sm text-gray-500">HTG {card.amount.toLocaleString()}</div>
              </div>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-sm",
              card.status === "Automatique" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            )}>
              {card.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Total:</span>
          <span className="font-semibold">HTG {(11500).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};