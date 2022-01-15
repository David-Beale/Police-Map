import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "../../ChartsStyle";

import CustomTooltip from "../Tooltip/Tooltip";
import { useData } from "./useData";

export default function Chart1() {
  const { groupedData, categories, colors } = useData();
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={groupedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {categories.map((category, index) => {
            return (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                stroke={colors[index]}
                dot={false}
              />
            );
          })}
          {/* <Line type="monotone" dataKey="crimes" stroke="#82ca9d" dot={false} /> */}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
