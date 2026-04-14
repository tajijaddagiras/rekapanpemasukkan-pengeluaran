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

export interface Investment {
  id?: string;
  userId: string;
  name: string;
  type: 'Saham' | 'Deposito' | 'Lainnya';
  platform: string;
  amountInvested: number;
  currentValue: number;
  returnPercentage: number;
  currency: string;
  dateInvested: Date;
  status: 'Active' | 'Closed';
  createdAt: Date;
}

const COLLECTION_NAME = 'investments';

export const investmentService = {
  async createInvestment(data: Omit<Investment, 'id' | 'createdAt'>) {
    const ref = collection(db, COLLECTION_NAME);
    const newDoc = await addDoc(ref, {
      ...data,
      dateInvested: Timestamp.fromDate(data.dateInvested),
      createdAt: Timestamp.now()
    });
    return newDoc.id;
  },

  async getUserInvestments(userId: string) {
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
        dateInvested: data.dateInvested.toDate(),
        createdAt: data.createdAt.toDate()
      } as Investment;
    });
  },

  async getInvestmentsByType(userId: string, type: string) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      where('type', '==', type)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        dateInvested: data.dateInvested.toDate(),
        createdAt: data.createdAt.toDate()
      } as Investment;
    });
  },

  async updateInvestment(id: string, data: Partial<Omit<Investment, 'id' | 'createdAt'>>) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updates: any = { ...data };
    if (data.dateInvested) {
      updates.dateInvested = Timestamp.fromDate(data.dateInvested);
    }
    await updateDoc(docRef, updates);
  },

  async deleteInvestment(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};
