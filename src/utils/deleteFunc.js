import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firestore/firestoreConfig';

export const deleteFunc = (id) => {
  deleteDoc(doc(db, 'books', { id }));
};
