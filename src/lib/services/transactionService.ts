import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Transaction {
  id?: string;
  userId: string;
  type: 'pemasukan' | 'pengeluaran' | 'transfer' | 'topup' | 'debt';
  amount: number;
  category: string;
  subCategory?: string;
  accountId: string;
  targetAccountId?: string; // Untuk transfer/topup
  date: Date;
  note?: string;
  status: 'PENDING' | 'VERIFIED' | 'FAILED';
  createdAt: Date;
}

const COLLECTION_NAME = 'transactions';

export const transactionService = {
  // Create
  async createTransaction(data: Omit<Transaction, 'id' | 'createdAt'>) {
    const transactionsRef = collection(db, COLLECTION_NAME);
    const newDoc = await addDoc(transactionsRef, {
      ...data,
      amount: Number(data.amount) || 0, // pastikan tersimpan sebagai number
      date: Timestamp.fromDate(data.date),
      createdAt: Timestamp.now()
    });
    return newDoc.id;
  },

  // Read all for user
  async getUserTransactions(userId: string) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        amount: Number(data.amount) || 0, // guard: selalu number
        date: data.date?.toDate?.() ?? new Date(),
        createdAt: data.createdAt?.toDate?.() ?? new Date()
      } as Transaction;
    });
  },

  // Read by type
  async getTransactionsByType(userId: string, type: string) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      where('type', '==', type),
      orderBy('date', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        amount: Number(data.amount) || 0, // guard: selalu number
        date: data.date?.toDate?.() ?? new Date(),
        createdAt: data.createdAt?.toDate?.() ?? new Date()
      } as Transaction;
    });
  },

  // Update
  async updateTransaction(id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt'>>) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updates: any = { ...data };
    if (data.date) {
      updates.date = Timestamp.fromDate(data.date);
    }
    await updateDoc(docRef, updates);
  },

  // Delete
  async deleteTransaction(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
