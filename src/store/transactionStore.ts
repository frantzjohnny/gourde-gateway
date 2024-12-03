interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
}

class TransactionStore {
  private static instance: TransactionStore;
  private transactions: Transaction[] = [];

  private constructor() {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      this.transactions = JSON.parse(stored);
    }
  }

  static getInstance(): TransactionStore {
    if (!TransactionStore.instance) {
      TransactionStore.instance = new TransactionStore();
    }
    return TransactionStore.instance;
  }

  addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID()
    };
    this.transactions.push(newTransaction);
    this.saveToLocalStorage();
    return newTransaction;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  private saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
}

export const transactionStore = TransactionStore.getInstance();

export const categories = {
  income: ['Salaire', 'Freelance', 'Investissements', 'Autres'],
  expense: ['Alimentation', 'Transport', 'Logement', 'Loisirs', 'Santé', 'Éducation', 'Autres']
};