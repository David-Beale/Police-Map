import {
  TooltipContainer,
  TooltipLabel,
  TooltipRow,
  TooltipValue,
} from "./TooltipStyle";

export default function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <TooltipContainer>
      <TooltipLabel>{label}</TooltipLabel>
      {payload
        .sort((a: any, b: any) => b.value - a.value)
        .map((item: any) => {
          return (
            <TooltipRow color={item.color} key={item.dataKey}>
              <div> {item.dataKey}:</div>
              <TooltipValue>{item.value}</TooltipValue>
            </TooltipRow>
          );
        })}
    </TooltipContainer>
  );
}
