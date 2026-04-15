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
  amountIDR?: number;
  currentValue: number;
  currentValueIDR?: number;
  returnPercentage: number;
  currency: string;
  durationMonths?: number;
  transactionType?: string;
  category?: string;
  accountId?: string;
  logoUrl?: string;
  quantity?: number;
  unit?: string;
  pricePerUnit?: number;
  stockCode?: string;
  exchangeCode?: string;
  sharesCount?: number;
  pricePerShare?: number;
  dateInvested: Date;
  targetDate?: Date;
  durationDays?: number;
  status: 'Active' | 'Closed' | 'Planned';
  createdAt: Date;
}

const COLLECTION_NAME = 'investments';

export const investmentService = {
  async createInvestment(data: Omit<Investment, 'id' | 'createdAt'>) {
    const ref = collection(db, COLLECTION_NAME);
    const newDoc = await addDoc(ref, {
      ...data,
      amountIDR: data.amountIDR || data.amountInvested || 0,
      currentValueIDR: data.currentValueIDR || data.currentValue || 0,
      durationMonths: Number(data.durationMonths) || 0,
      quantity: Number(data.quantity) || 0,
      pricePerUnit: Number(data.pricePerUnit) || 0,
      sharesCount: Number(data.sharesCount) || 0,
      pricePerShare: Number(data.pricePerShare) || 0,
      dateInvested: Timestamp.fromDate(data.dateInvested),
      targetDate: data.targetDate ? Timestamp.fromDate(data.targetDate) : null,
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
        targetDate: data.targetDate?.toDate?.() || null,
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
