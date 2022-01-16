import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { ChartContainer, ZoomOutContainer } from "../../ChartsStyle";

import CustomTooltip from "../Tooltip/Tooltip";
import { useData } from "./useData";
import { useZoom } from "./useZoom";
import { StyledIconButton } from "../../../ModeSelectButton/ModeSelectButtonStyle";
import { Mode } from "../../Charts";
import { useEffect, useState } from "react";

export interface ChartProps {
  mode: Mode;
}
export default function Chart1({ mode }: ChartProps) {
  const [width, setWidth] = useState("100%");

  const { groupedData, categories, xAxisLabels, colors } = useData({ mode });
  const {
    left,
    right,
    top,
    bottom,
    data,
    refAreaLeft,
    refAreaRight,
    zoom,
    zoomOut,
    onMouseDown,
    onMouseMove,
  } = useZoom({ initialData: groupedData });

  useEffect(() => {
    setWidth((prev) => (prev === "100%" ? "99%" : "100%"));
  }, [categories]);

  return (
    <ChartContainer>
      {left >= 0 && (
        <ZoomOutContainer>
          <StyledIconButton onClick={zoomOut}>
            <ZoomOutIcon fontSize="large" />
          </StyledIconButton>
        </ZoomOutContainer>
      )}
      <ResponsiveContainer key={mode} width={width} height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            allowDecimals={false}
            tickFormatter={(i) => xAxisLabels[i]}
            dataKey="name"
            type="number"
            domain={[left, right]}
          />
          <YAxis allowDataOverflow domain={[bottom, top]} />
          <Tooltip content={<CustomTooltip xAxisLabels={xAxisLabels} />} />
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
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              x1={data[refAreaLeft].name}
              x2={data[refAreaRight].name}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
