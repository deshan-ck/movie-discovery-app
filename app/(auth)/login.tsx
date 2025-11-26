import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
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

      <View className="px-6 flex-1">
        <Text className="text-white text-3xl font-bold mb-2">Welcome Back</Text>
        <Text className="text-gray-400 text-base mb-8">
          Sign in to continue
        </Text>

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

        <View className="mb-6">
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

        <TouchableOpacity
          className="rounded-lg overflow-hidden mb-4"
          onPress={handleLogin}
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
              <Text className="text-white font-bold text-base">Sign In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          <Text className="text-gray-400 text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-[#FF494C] font-semibold text-sm">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
