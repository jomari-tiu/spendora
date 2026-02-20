import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className = "", style, ...props }: CardProps) {
  return (
    <View
      className={`bg-white  rounded-xl p-4 shadow-sm ${className}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
