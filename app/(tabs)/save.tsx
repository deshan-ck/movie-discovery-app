import { icons } from "@/constants/icons";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { getSavedMovies } from "@/services/appwrite";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";

const Save = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadSavedMovies();
      }
    }, [user])
  );

  const loadSavedMovies = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const movies = await getSavedMovies(user.$id);
      setSavedMovies(movies);
    } catch (error) {
      console.error("Error loading saved movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }: any) => (
    <TouchableOpacity
      className="w-[30%]"
      onPress={() => router.push(`/movie/${item.movie_id}`)}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />
      <View className="mt-2">
        <Text className="text-white text-sm font-bold" numberOfLines={1}>
          {item.title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1 mt-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {item.vote_average ? Math.round(item.vote_average / 2) : "N/A"}
          </Text>
        </View>
        {item.release_date && (
          <Text className="text-gray-400 text-xs mt-1">
            {item.release_date.split("-")[0]}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-black flex-1">
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
      
      <View className="items-center mt-3 mb-4">
        <Text className="text-white text-[26px] font-extrabold tracking-[4px]">
          CINEMA+
        </Text>
      </View>

      <View className="flex-1 px-5">
        <Text className="text-white text-2xl font-bold mb-4">Saved Movies</Text>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FF494C" />
          </View>
        ) : savedMovies.length === 0 ? (
          <View className="flex-1 justify-center items-center px-10">
            <Image source={icons.save} className="size-16 mb-4" tintColor="#666" />
            <Text className="text-gray-400 text-base text-center">
              No saved movies yet
            </Text>
            <Text className="text-gray-500 text-sm text-center mt-2">
              Start exploring and save your favorite movies!
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.$id}
            numColumns={3}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 16,
              marginBottom: 14,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Save;
