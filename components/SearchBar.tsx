import React from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { icons } from "@/constants/icons";

type SearchBarProps = {
  onPress?: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onPress,
  placeholder = "Search movies online",
  value,
  onChangeText,
}) => {
  // If onChangeText is provided, render a TextInput (editable)
  if (onChangeText) {
    return (
      <View className="w-full">
        <View className="flex-row items-center w-full rounded-full bg-[#6B6B6B] px-5 py-2.5">
          {/* Red search icon on the left */}
          <Image
            source={icons.search}
            className="w-6 h-6 mr-4"
            style={{ tintColor: "#FF3B30" }}
            resizeMode="contain"
          />

          {/* Text Input */}
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#CCCCCC"
            className="flex-1 text-[16px] text-white"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    );
  }

  // Otherwise, render a TouchableOpacity (non-editable, navigates)
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="w-full"
    >
      <View className="flex-row items-center w-full rounded-full bg-[#6B6B6B] px-5 py-2">
        {/* Red search icon on the left */}
        <Image
          source={icons.search}
          className="w-5 h-5 mr-3"
          style={{ tintColor: "#FF3B30" }}
          resizeMode="contain"
        />

        {/* Placeholder text (non-editable input so caret doesn't show) */}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#CCCCCC"
          className="flex-1 text-[16px] text-white"
          editable={false}
          pointerEvents="none"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;
