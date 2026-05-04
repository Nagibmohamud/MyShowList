import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./fireconfig";

export async function faveSwitch(item) {

    const user = auth.currentUser;

    if (!user) {
        console.log("Not logged in");
        return;}

    const favouritesRef = doc(db, "users", user.uid, "favourites", item.imdbID);
    const snapshot = await getDoc(favouritesRef);
        
    await setDoc(favouritesRef, {
      imdbID: item.imdbID,
      title: item.Title,
      year: item.Year,
      type: item.Type,
      poster: item.Poster,
    });
    

}