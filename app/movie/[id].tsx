import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";

import { icons } from "@/constants/icons";
import useFetch from "@/services/usefetch";
import { fetchMovieDetails } from "@/services/api";
import { saveMovie, unsaveMovie, isMovieSaved } from "@/services/appwrite";
import { useAuth } from "@/contexts/AuthContext";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-gray-400 font-normal text-sm">{label}</Text>
    <Text className="text-white font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [savingMovie, setSavingMovie] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  useEffect(() => {
    if (user && id) {
      checkIfSaved();
    }
  }, [user, id]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const checkIfSaved = async () => {
    if (!user) return;
    const saved = await isMovieSaved(user.$id, id as string);
    setIsSaved(saved);
  };

  const handleSaveMovie = async () => {
    if (!user || !movie) return;

    setSavingMovie(true);
    try {
      if (isSaved) {
        await unsaveMovie(user.$id, movie.id.toString());
        setIsSaved(false);
        setAlertMessage("Movie removed from saved list");
      } else {
        await saveMovie(user.$id, movie);
        setIsSaved(true);
        setAlertMessage("Movie saved successfully");
      }
      setShowAlert(true);
    } catch (error: any) {
      setAlertMessage(error.message || "Failed to save movie");
      setShowAlert(true);
    } finally {
      setSavingMovie(false);
    }
  };

  if (loading)
    return (
      <SafeAreaView className="bg-black flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-black flex-1">
      {/* Alert Toast */}
      {showAlert && (
        <View className="absolute top-14 left-5 right-5 z-50">
          <View className="bg-[#1A1A1A] border border-[#FF494C] rounded-lg px-4 py-3 flex-row items-center">
            <Image source={icons.save} className="size-5 mr-3" tintColor="#FF494C" />
            <Text className="text-white text-sm flex-1">{alertMessage}</Text>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity
            className="absolute bottom-5 right-5 rounded-full size-14 bg-white/90 flex items-center justify-center"
            onPress={handleSaveMovie}
            disabled={savingMovie}
          >
            {savingMovie ? (
              <ActivityIndicator size="small" color="#FF494C" />
            ) : (
              <Image
                source={icons.save}
                className="size-6"
                tintColor={isSaved ? "#FF494C" : "#000"}
              />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-gray-400 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-gray-400 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-gray-400 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 rounded-lg overflow-hidden z-50"
        onPress={router.back}
      >
        <LinearGradient
          colors={['#FF494C', '#990003']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="py-3.5 flex flex-row items-center justify-center"
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#fff"
          />
          <Text className="text-white font-semibold text-base">Go Back</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
