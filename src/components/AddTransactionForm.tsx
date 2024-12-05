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

const formSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.string().min(1, "Le montant est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().min(1, "La description est requise"),
});

interface AddTransactionFormProps {
  onSuccess: () => void;
  initialData?: any;
  isEditing?: boolean;
}

export const AddTransactionForm = ({ onSuccess, initialData, isEditing = false }: AddTransactionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "income",
      amount: "",
      category: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData && isEditing) {
      form.reset({
        type: initialData.type,
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description,
      });
    }
  }, [initialData, isEditing, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      toast.error("Vous devez être connecté pour ajouter une transaction");
      return;
    }

    if (isEditing && initialData) {
      const success = transactionStore.updateTransaction(initialData.id, {
        type: values.type,
        amount: parseFloat(values.amount),
        category: values.category,
        description: values.description,
      });

      if (success) {
        toast.success("Transaction modifiée avec succès");
        onSuccess();
      } else {
        toast.error("Erreur lors de la modification de la transaction");
      }
    } else {
      transactionStore.addTransaction({
        type: values.type,
        amount: parseFloat(values.amount),
        category: values.category,
        description: values.description,
        date: new Date(),
        userId: currentUser.id
      });
      
      toast.success("Transaction ajoutée avec succès");
      onSuccess();
    }
    
    if (!isEditing) {
      form.reset();
    }
  };

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

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant (HTG)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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