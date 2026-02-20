import { View, Text } from "react-native";
import { PolarChart, Pie } from "victory-native";
import { CategoryExpense } from "../../types";
import { formatCurrency } from "../../utils/currency";
import { useTheme } from "../../hooks/useTheme";

interface ExpensePieChartProps {
  data: CategoryExpense[];
}

export function ExpensePieChart({ data }: ExpensePieChartProps) {
  const { currency } = useTheme();

  if (data.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text className="text-gray-400 ">No expenses this month</Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    value: item.amount,
    color: item.color,
    label: item.name,
  }));

  return (
    <View>
      <View style={{ height: 200 }}>
        <PolarChart
          data={chartData}
          labelKey="label"
          valueKey="value"
          colorKey="color"
        >
          <Pie.Chart innerRadius="55%">{() => <Pie.Slice />}</Pie.Chart>
        </PolarChart>
      </View>

      {/* Legend */}
      <View style={{ gap: 8, marginTop: 8 }}>
        {data.slice(0, 5).map((item) => (
          <View
            key={item.categoryId}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: item.color,
                }}
              />
              <Text className="text-sm text-gray-700 ">
                {item.icon} {item.name}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text className="text-sm font-semibold text-gray-900 ">
                {formatCurrency(item.amount, currency)}
              </Text>
              <Text
                className="text-xs text-gray-500 "
                style={{ width: 44, textAlign: "right" }}
              >
                {item.percentage.toFixed(1)}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
