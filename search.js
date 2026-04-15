export async function searchMovies(searchText) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=bcab9b97&s=${encodeURIComponent(searchText)}`
    );

    const data = await response.json();

    if (data.Response === "False") {
      return [];
    }

    return data.Search;
  } catch (error) {
    console.log("Error in searching", error);
    return [];
  }
}