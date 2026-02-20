import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const baseClass = "rounded-xl py-3 px-6 items-center justify-center flex-row";
  const variantClass =
    variant === "primary"
      ? "bg-brand-red"
      : variant === "danger"
        ? "bg-red-700"
        : "border border-gray-300";

  const textClass =
    variant === "ghost"
      ? "text-gray-700  font-semibold text-base"
      : "text-white font-semibold text-base";

  return (
    <TouchableOpacity
      className={`${baseClass} ${variantClass} ${disabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className={textClass}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
