import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./fireconfig";

export async function faveSwitch(item) {
    const user = auth.currentUser;

    if (!user) {
        console.log("Not logged in");
        return;}

    const favouritesRef = doc(db, "users", user.uid, "favourites", item.imdbID);
    const snapshot = await getDoc(favouritesRef);

    if (snapshot.exists()) {
        await deleteDoc(favouritesRef);
        console.log("Removed from favourites");
        return false;
    }
    else {      
    await setDoc(favouritesRef, {
      imdbID: item.imdbID,
      title: item.Title,
      year: item.Year,
      type: item.Type,
      poster: item.Poster,
    });
    return true;
    }    

}