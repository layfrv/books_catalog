import { db } from "./firestore";
import { collection, getDocs } from "firebase/firestore";


export const getBooks = () => getDocs(
    collection(
        db,
        'books'
    )
)
