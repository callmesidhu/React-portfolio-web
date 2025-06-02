import { doc, updateDoc, increment } from "firebase/firestore";
import {db} from "../../configs/firebase";

export const VisitorCount = async () => {
  const docRef = doc(db, "dashboard", "visitors");
async function updateVisitorCount() {
  try {
    await updateDoc(docRef, {
      count: increment(1)  
    });
  } catch (error) {
    console.error("Error updating count:", error);
  }
}
updateVisitorCount();
}