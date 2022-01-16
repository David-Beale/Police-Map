import { useCallback, useEffect, useState } from "react";
import { ChartItem } from "./useData";

interface Props {
  initialData: ChartItem[];
}
export const useZoom = ({ initialData }: Props) => {
  const [left, setLeft] = useState<any>("dataMin");
  const [right, setRight] = useState<any>("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);
  const [top, setTop] = useState<string | number>("dataMax+1");
  const [bottom, setBottom] = useState<string | number>("dataMin-1");

  const reset = useCallback(() => {
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeft("dataMin");
    setRight("dataMax");
    setBottom("dataMin-1");
    setTop("dataMax+1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  useEffect(() => {
    //add timeout to prevent this from interfering with resize logic
    setTimeout(() => {
      reset();
    }, 100);
  }, [reset]);

  const getAxisYDomain = useCallback(
    (from: number, to: number) => {
      const refData: any[] = initialData.slice(from, to + 1);
      let bottom = Infinity;
      let top = -Infinity;

      refData.forEach((d) => {
        const keys = Object.keys(d);
        keys.forEach((key) => {
          if (key === "name") return;
          if (d[key] < bottom) bottom = d[key];
          if (d[key] > top) top = d[key];
        });
      });

      return [bottom, top];
    },
    [initialData]
  );

  const zoom = () => {
    let left = refAreaLeft;
    let right = refAreaRight;

    setRefAreaLeft(null);
    setRefAreaRight(null);

    if (left === right || right === null || left === null) return;

    // xAxis domain
    if (left > right) [left, right] = [right, left];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(left, right);

    setLeft(initialData[left].name);
    setRight(initialData[right].name);
    setBottom(bottom);
    setTop(top);
  };

  const zoomOut = () => {
    reset();
  };

  const onMouseDown = (e: any) => {
    setRefAreaLeft(e.activeTooltipIndex);
  };
  const onMouseMove = (e: any) => {
    if (!refAreaLeft) return;
    setRefAreaRight(e.activeTooltipIndex);
  };

  return {
    left,
    right,
    top,
    bottom,
    refAreaLeft,
    refAreaRight,
    zoom,
    zoomOut,
    onMouseDown,
    onMouseMove,
  };
};
