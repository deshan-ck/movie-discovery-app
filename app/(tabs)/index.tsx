import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const isLoading = trendingLoading || moviesLoading;
  const hasError = trendingError || moviesError;

  return (
    // PURE BLACK base background
    <SafeAreaView className="flex-1 bg-black">
      {/* Red → dark gradient at the top, behind content */}
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

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* CINEMA+ title */}
        <View className="items-center mt-3 mb-4">
          <Text className="text-white text-[26px] font-extrabold tracking-[4px]">
            CINEMA+
          </Text>
        </View>

        {/* Non-editable search bar that navigates to /search */}
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search movies online"
        />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#FF3B30"
            className="mt-10 self-center"
          />
        ) : hasError ? (
          <Text className="text-red-500 mt-6">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-6">
            {/* Popular movies */}
            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-2">
                <Text className="text-[16px] text-white font-semibold mb-2">
                  Popular movies
                </Text>

                <FlatList
                  data={trendingMovies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 18, paddingVertical: 6 }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `trending-${item.movie_id}-${index}`}
                />
              </View>
            )}

            {/* Latest movies grid */}
            <View className="mt-6">
              <Text className="text-[16px] text-white font-semibold mb-2">
                Latest movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item, index) => `movie-${item.id}-${index}`}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 16,
                  marginBottom: 14,
                }}
                className="mt-1 pb-32"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
