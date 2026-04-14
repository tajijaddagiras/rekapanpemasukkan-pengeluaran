import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Account {
  id?: string;
  userId: string;
  name: string;
  type: 'Bank Account' | 'E-Wallet' | 'Cash' | 'Investment Account' | 'Credit Card';
  currency: string;
  balance: number;
  initialBalance: number;
  logoUrl?: string;
  logoLabel?: string;
  createdAt: Date;
}

const COLLECTION_NAME = 'accounts';

export const accountService = {
  async createAccount(data: Omit<Account, 'id' | 'createdAt'>) {
    const accountsRef = collection(db, COLLECTION_NAME);
    const newDoc = await addDoc(accountsRef, {
      ...data,
      balance: data.initialBalance, // Set initial balance
      createdAt: Timestamp.now()
    });
    return newDoc.id;
  },

  async getUserAccounts(userId: string) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt.toDate()
      } as Account;
    });
  },

  async updateAccount(id: string, data: Partial<Omit<Account, 'id' | 'createdAt'>>) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  async deleteAccount(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
