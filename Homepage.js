import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Image,StyleSheet } from "react-native";
import { searchMovies } from "./search";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  async function handleSearch() {
    const result = await searchMovies(searchText);
    setMovies(result);
  }

  
  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Search for your favorite movies!</Text>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for a movie"
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (

          <View style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>
                {item.Title}
              </Text>
              <Text style={styles.infoText}>Year: {item.Year}</Text>
              <Text style={styles.infoText}>Type: {item.Type}</Text>
            </View>

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
  },
}); 
