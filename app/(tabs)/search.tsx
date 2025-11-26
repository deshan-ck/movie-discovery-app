import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieDisplayCard from "@/components/MovieCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <LinearGradient
        colors={["#C30824", "#5B020F", "#000000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 170,
          zIndex: -1,
        }}
      />

      <View className="px-5 mt-3 mb-4">
        <Text className="text-white text-[26px] font-extrabold tracking-[4px] text-center mb-4">
          CINEMA
        </Text>
        <SearchBar
          placeholder="Search movies online"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#DC143C"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-base text-white font-semibold mb-4">
                  Search Results for{" "}
                  <Text className="text-red-400">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Search;
