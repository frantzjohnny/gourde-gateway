import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, transactionStore } from "@/store/transactionStore";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/storage";
import { useEffect } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.string().min(1, "Le montant est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().min(1, "La description est requise"),
  currency: z.enum(["HTG", "USD"]),
});

interface AddTransactionFormProps {
  onSuccess: () => void;
  initialData?: any;
  isEditing?: boolean;
  onClose?: () => void;
}

export const AddTransactionForm = ({ onSuccess, initialData, isEditing = false, onClose }: AddTransactionFormProps) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      toast.error("Vous devez être connecté pour effectuer une transaction");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "income",
      amount: "",
      category: "",
      description: "",
      currency: "HTG",
    },
  });

  useEffect(() => {
    if (initialData && isEditing) {
      form.reset({
        type: initialData.type,
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description,
        currency: initialData.currency || "HTG",
      });
    }
  }, [initialData, isEditing, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser) {
      toast.error("Vous devez être connecté pour ajouter une transaction");
      navigate("/login");
      return;
    }

    // Convertir le montant en HTG si nécessaire
    let finalAmount = parseFloat(values.amount);
    if (values.currency === "USD") {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        finalAmount = finalAmount * data.rates.HTG;
      } catch (error) {
        toast.error("Erreur lors de la conversion de la devise");
        return;
      }
    }

    if (isEditing && initialData) {
      const success = transactionStore.updateTransaction(initialData.id, {
        type: values.type,
        amount: finalAmount,
        category: values.category,
        description: values.description,
        currency: values.currency,
      });

      if (success) {
        toast.success("Transaction modifiée avec succès");
        onSuccess();
        onClose?.();
      } else {
        toast.error("Erreur lors de la modification de la transaction");
      }
    } else {
      transactionStore.addTransaction({
        type: values.type,
        amount: finalAmount,
        category: values.category,
        description: values.description,
        currency: values.currency,
        date: new Date(),
        userId: currentUser.id
      });
      
      toast.success("Transaction ajoutée avec succès");
      onSuccess();
      onClose?.();
    }
    
    if (!isEditing) {
      form.reset();
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de transaction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Recette</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Devise</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la devise" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HTG">HTG</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {form.watch("type") === "income" 
                    ? categories.income.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))
                    : categories.expense.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description de la transaction" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Modifier la transaction" : "Ajouter la transaction"}
        </Button>
      </form>
    </Form>
  );
};