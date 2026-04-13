import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export type TransactionType = 'pemasukkan' | 'pengeluaran' | 'investasi' | 'tabungan';

export interface Transaction {
  id?: string;
  userId: string;
  type: TransactionType;
  category: string;
  item: string;
  budget: number;
  actual: number;
  date: Date;
  createdAt: Date;
}

const COLLECTION_NAME = 'transactions';

export const addTransaction = async (data: Omit<Transaction, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    date: Timestamp.fromDate(data.date),
    createdAt: Timestamp.now(),
  });
};

export const getTransactions = async (userId: string, type?: TransactionType) => {
  let q = query(
    collection(db, COLLECTION_NAME), 
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );

  if (type) {
    q = query(q, where('type', '==', type));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: (doc.data().date as Timestamp).toDate(),
    createdAt: (doc.data().createdAt as Timestamp).toDate(),
  })) as Transaction[];
};

export const subscribeTransactions = (userId: string, callback: (transactions: Transaction[]) => void) => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: (doc.data().date as Timestamp).toDate(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
    })) as Transaction[];
    callback(transactions);
  });
};
