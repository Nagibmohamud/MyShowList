import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { collection, getDocs, doc } from "firebase/firestore";
import { auth, db } from "./fireconfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Favourites() {

    const [favourites, setFavourites] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    async function fetchFavourites(user) {

        const snapshot = await getDocs(collection(db, "users", user.uid, "favourites"));
        const data = snapshot.docs.map((doc) => doc.data());
        setFavourites(data);    
    }

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
  
   
    
    return (
       <View styles={styles.container}>  

        <FlatList
          data={favourites}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.infoText}>{item.year} · {item.type}</Text>
              </View>
            </View>
          )}
        />
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
    borderWidth: 5,
    borderColor: "#0000003f",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginTop: 10,
  }, heart: {
    fontSize: 26,
    padding: 6,
  },
}); 