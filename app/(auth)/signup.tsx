import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp(name, email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
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
          height: 170,
          zIndex: -1,
        }}
      />

      <View className="items-center mt-3 mb-8">
        <Text className="text-white text-[26px] font-extrabold tracking-[4px]">
          CINEMA+
        </Text>
      </View>

      <ScrollView className="px-6 flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-white text-3xl font-bold mb-2">
          Create Account
        </Text>
        <Text className="text-gray-400 text-base mb-8">
          Sign up to get started
        </Text>

        <View className="mb-4">
          <Text className="text-white text-sm font-semibold mb-2">Name</Text>
          <TextInput
            className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg text-base"
            placeholder="Enter your name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white text-sm font-semibold mb-2">Email</Text>
          <TextInput
            className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg text-base"
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-white text-sm font-semibold mb-2">
            Password
          </Text>
          <TextInput
            className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg text-base"
            placeholder="Enter your password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-white text-sm font-semibold mb-2">
            Confirm Password
          </Text>
          <TextInput
            className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg text-base"
            placeholder="Confirm your password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="rounded-lg overflow-hidden mb-4"
          onPress={handleSignup}
          disabled={loading}
        >
          <LinearGradient
            colors={["#FF494C", "#990003"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-4 flex items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-base">Sign Up</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-gray-400 text-sm">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-[#FF494C] font-semibold text-sm">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
