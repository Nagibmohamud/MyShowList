import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./fireconfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "firebase/database";

export default function Favourites() {

    const [favourites, setFavourites] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    

  //Refreshes the favourites list 
    async function refreshFavourites() {
      if (!currentUser) return;
      await fetchFavourites(currentUser);
    }


  //Getting the users favourites from Firestore
    async function fetchFavourites(user) {

        const snapshot = await getDocs(collection(db, "users", user.uid, "favourites"));
        const data = snapshot.docs.map((doc) => doc.data());
        setFavourites(data);    
    }
//Removing movie/series from favourites
    async function removeFave(imdbID) {
      if (!currentUser) return;

      await deleteDoc(doc(db, "users", currentUser.uid, "favourites", imdbID));
      setFavourites((prev) => prev.filter((item) => item.imdbID !== imdbID));
      
      console.log("Removed from favourites:", imdbID);
    }
//Listens for login/logout changes to update the favourites list
    useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchFavourites(user);

      } else {
        setCurrentUser(null);
        setFavourites([]);
      }
    });
      return unsub;
  }, []);
  
   
      // Favourites page UI
    return (
        
       <View style={styles.container}>

        <View style={styles.headerRow}>
          <Text style={styles.heading}>Favourites</Text>
            <Pressable style={styles.refreshbutton} onPress={refreshFavourites}>
              <Text style={styles.refreshText}>Refresh </Text>
            </Pressable>
        </View>

        <FlatList
          data={favourites}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>{item.year} · {item.type}</Text>
              </View>
              <Pressable onPress={() => removeFave(item.imdbID)}>
                <Text style={styles.heart}>❤️</Text>
              </Pressable>
            </View>
          )}
        />
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#fff",
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    gap: 12,
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#333",
  }, heart: {
    fontSize: 26,
    padding: 6,
  },
  refreshbutton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#ff0000",
  },
  refreshText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  meta: {
    color: "#aaa",
    fontSize: 13,
    textTransform: "capitalize",
  },
    textContainer: { 
    flex: 1,
  },
  
}); 