import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/storage";
import { PlusCircle, Trash2 } from "lucide-react";

interface CreditCard {
  id: string;
  userId: string;
  number: string;
  name: string;
  bank: string;
  type: "credit" | "debit";
}

const CreditCardManager = () => {
  const [cards, setCards] = useState<CreditCard[]>(() => {
    const stored = localStorage.getItem("credit_cards");
    return stored ? JSON.parse(stored) : [];
  });
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardBank, setNewCardBank] = useState("");
  const [newCardType, setNewCardType] = useState<"credit" | "debit">("credit");

  const user = getCurrentUser();

  const saveCards = (updatedCards: CreditCard[]) => {
    localStorage.setItem("credit_cards", JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  const addCard = () => {
    if (!user) return;
    if (!newCardNumber || !newCardName || !newCardBank) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const newCard: CreditCard = {
      id: crypto.randomUUID(),
      userId: user.id,
      number: newCardNumber.replace(/\s/g, "").slice(-4),
      name: newCardName,
      bank: newCardBank,
      type: newCardType
    };

    const updatedCards = [...cards, newCard];
    saveCards(updatedCards);
    setNewCardNumber("");
    setNewCardName("");
    setNewCardBank("");
    setNewCardType("credit");
    toast.success("Carte ajoutée avec succès");
  };

  const removeCard = (cardId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    saveCards(updatedCards);
    toast.success("Carte supprimée avec succès");
  };

  const userCards = cards.filter((card) => card.userId === user?.id);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Ajouter une carte</h2>
        <div className="grid gap-4">
          <Input
            placeholder="Nom sur la carte"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
          />
          <Input
            placeholder="Nom de la banque"
            value={newCardBank}
            onChange={(e) => setNewCardBank(e.target.value)}
          />
          <Input
            placeholder="Numéro de carte"
            value={newCardNumber}
            onChange={(e) => setNewCardNumber(e.target.value)}
            type="number"
            maxLength={16}
          />
          <Select value={newCardType} onValueChange={(value: "credit" | "debit") => setNewCardType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Type de carte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Carte de crédit</SelectItem>
              <SelectItem value="debit">Carte de débit</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addCard} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter la carte
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Vos cartes</h2>
        {userCards.length === 0 ? (
          <p className="text-muted-foreground">Aucune carte enregistrée</p>
        ) : (
          <div className="grid gap-4">
            {userCards.map((card) => (
              <Card key={card.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{card.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {card.bank} - {card.type === "credit" ? "Crédit" : "Débit"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** {card.number}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeCard(card.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardManager;