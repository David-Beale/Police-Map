import { useMemo } from "react";
import data from "../../Data/chartData.json";
import { interpolateSinebow } from "d3-scale-chromatic";

interface Categories {
  [index: string]: boolean;
}
interface ChartItem {
  name: string;
  [index: string]: number | string | undefined;
}

export const useData = () => {
  const [groupedData, categories, colors] = useMemo(() => {
    const categories: Categories = {};
    const groupedData: ChartItem[] = data.map((item) => {
      const [year, month] = item.month.split(", ");

      Object.keys(item.categories).forEach((category) => {
        if (!categories[category]) categories[category] = true;
      });
      // const total = Object.values(item.categories).reduce((a, b) => a + b, 0);
      return {
        name: `${month}/${year.slice(2)}`,
        // crimes: total,
        ...item.categories,
      } as ChartItem;
    });
    const categoryArray = Object.keys(categories);
    const spacing = 1 / (categoryArray.length - 1);
    const colors = categoryArray.map((category, index) =>
      interpolateSinebow(index * spacing)
    );
    return [groupedData, categoryArray.sort(), colors];
  }, []);

  return { groupedData, categories, colors };
};
