import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  updateDoc,
  increment 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  totalWealth: number;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  totalInvestment: number;
  creditCardBills: number;
  otherDebts: number;
}

const COLLECTION_NAME = 'users';

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const subscribeUserProfile = (uid: string, callback: (profile: UserProfile | null) => void) => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as UserProfile);
    } else {
      callback(null);
    }
  });
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  return await setDoc(docRef, data, { merge: true });
};

export const updateMemberTotals = async (userId: string, type: string, actualAmount: number) => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  
  const updates: any = {};
  
  if (type === 'pemasukan') updates.totalIncome = increment(actualAmount);
  if (type === 'pengeluaran') updates.totalExpenses = increment(actualAmount);
  if (type === 'tabungan') updates.totalSavings = increment(actualAmount);
  if (type === 'investasi') updates.totalInvestment = increment(actualAmount);
  
  // Calculate wealth (income - expenses)
  if (type === 'pemasukan') updates.totalWealth = increment(actualAmount);
  if (type === 'pengeluaran') updates.totalWealth = increment(-actualAmount);
  
  await updateDoc(userRef, updates);
};
