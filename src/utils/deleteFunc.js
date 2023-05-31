import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firestore/firestoreConfig';

export const deleteFunc = () => {
  db.collection('books')
    .get()
    .then((book) => {
      book.forEach((doc) => {
        doc.ref.delete();
      });
    });
};
