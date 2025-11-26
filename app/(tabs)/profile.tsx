import { icons } from "@/constants/icons";
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to logout");
          }
        },
      },
    ]);
  };

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
          height: 250,
          zIndex: -1,
        }}
      />

      <View className="items-center mt-3 mb-6">
        <Text className="text-white text-[26px] font-extrabold tracking-[4px]">
          CINEMA+
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center mt-6 mb-8">
          <View className="bg-white/10 rounded-full p-8 mb-4 border-2 border-white/20">
            <Image source={icons.person} className="size-20" tintColor="#fff" />
          </View>
          <Text className="text-white text-2xl font-bold mb-2">
            {user?.name}
          </Text>
          <Text className="text-gray-400 text-base">{user?.email}</Text>
        </View>

        {/* Account Information Card */}
        <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-4">
          <Text className="text-white text-lg font-bold mb-4">Account Information</Text>
          
          <View className="mb-4">
            <Text className="text-gray-400 text-xs mb-1">FULL NAME</Text>
            <Text className="text-white text-base">{user?.name}</Text>
          </View>

          <View className="border-t border-gray-800 pt-4 mb-4">
            <Text className="text-gray-400 text-xs mb-1">EMAIL ADDRESS</Text>
            <Text className="text-white text-base">{user?.email}</Text>
          </View>

          <View className="border-t border-gray-800 pt-4">
            <Text className="text-gray-400 text-xs mb-1">USER ID</Text>
            <Text className="text-white text-xs font-mono">{user?.$id}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="rounded-xl overflow-hidden mb-8"
          onPress={handleLogout}
        >
          <LinearGradient
            colors={["#FF494C", "#990003"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-4 flex flex-row items-center justify-center"
          >
            <Text className="text-white font-bold text-base">Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
