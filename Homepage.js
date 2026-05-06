import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Image,StyleSheet, Pressable } from "react-native";
import { searchMovies } from "./search";
import { faveSwitch } from "./Fav_switch";

export default function App() {
  
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [faved, setFaved] = useState([]);

  // Search for movies based on the search text
  async function handleSearch() {
    const result = await searchMovies(searchText);
    setMovies(result);
  }

  // Handle adding/removing movies from favourites
  async function handleFave(item) {
    const added = await faveSwitch(item);
    setFaved((prev) => ({ ...prev, [item.imdbID]: added }));
    console.log("Added to favourites:", item.Title);
    
  }
  
  // Homepage UI
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search </Text>

      <View style={styles.searchRow}>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for a movie"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Pressable style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (

          <View style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {item.Title}
              </Text>
              <Text style={styles.infoText}>Year: {item.Year}</Text>
              <Text style={styles.infoText}>Type: {item.Type}</Text>
            </View>
            
            {/*Favourite button red if liked, white if not */}
            <Pressable onPress={() => handleFave(item)}>
              <Text style={styles.heart}>
                {faved[item.imdbID] ?  "❤️" : "🤍"}
              </Text>
            </Pressable>

              <Image
                source={{ uri: item.Poster }}
                style={styles.poster}
              />
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
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
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
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    paddingBottom: 10,
  },
   searchRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },searchButton: {
    backgroundColor: "#e50914",
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
   searchButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },textContainer: {
    flex: 1,
  },
  infoText: {
    color: "#aaa",
    fontSize: 13,
    textTransform: "capitalize",
    marginBottom: 2,
  },
  
}); 