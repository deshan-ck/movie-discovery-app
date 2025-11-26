import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Save = () => {
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
          CINEMA
        </Text>
      </View>

      <View className="flex justify-center items-center flex-1 flex-col gap-5 px-10">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-base">Save</Text>
      </View>
    </SafeAreaView>
  );
};

export default Save;
