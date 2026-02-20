import { View, Text, Platform } from "react-native";
import { CartesianChart, BarGroup } from "victory-native";
import { matchFont } from "@shopify/react-native-skia";
import { MonthlyAggregate } from "../../types";
import { COLORS } from "../../constants/colors";
import { useMemo } from "react";

const fontFamily = Platform.select({ ios: "Helvetica Neue", default: "sans-serif" });
const xAxisFont = matchFont({ fontFamily: fontFamily!, fontSize: 10 });

type MonthlyBarChartProps = {
  data: MonthlyAggregate[];
};

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  if (data.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text className="text-gray-400 dark:text-gray-500">
          No data available
        </Text>
      </View>
    );
  }

  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
    }));
  }, [data]);

  return (
    <View className="h-[230px]">
      <CartesianChart
        data={chartData}
        xKey="month"
        yKeys={["income", "expense"]}
        domainPadding={{ left: 20, right: 20, top: 10 }}
        xAxis={{ font: xAxisFont, labelColor: "#6B7280", labelOffset: 6 }}
      >
        {({ points, chartBounds }) => (
          <BarGroup
            chartBounds={chartBounds}
            betweenGroupPadding={0.3}
            withinGroupPadding={0.1}
          >
            <BarGroup.Bar points={points.expense} color={COLORS.expense} />
            <BarGroup.Bar points={points.income} color={COLORS.income} />
          </BarGroup>
        )}
      </CartesianChart>
    </View>
  );
}
