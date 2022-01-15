import { useMemo } from "react";
import data from "../../Data/chartData.json";
import { interpolateSinebow } from "d3-scale-chromatic";

interface Categories {
  [index: string]: boolean;
}
interface ChartItem {
  name?: string;
  [index: string]: number | string | undefined;
}
interface Data {
  month: string;
  categories: {
    [index: string]: number | undefined;
  };
  neighbourhoods: {
    [index: string]: number | undefined;
  };
}

const buildTotal = (item: Data, categories: Categories): ChartItem => {
  const [year, month] = item.month.split(", ");
  categories.crimes = true;

  const total = Object.values(item.categories).reduce(
    (a = 0, b = 0) => a + b,
    0
  );
  return {
    name: `${month}/${year.slice(2)}`,
    crimes: total,
  };
};
const buildCategories = (item: Data, categories: Categories): ChartItem => {
  const [year, month] = item.month.split(", ");
  Object.keys(item.categories).forEach((category) => {
    if (!categories[category]) categories[category] = true;
  });
  return {
    name: `${month}/${year.slice(2)}`,
    ...item.categories,
  };
};
const buildNeighbourhoods = (item: Data, categories: Categories): ChartItem => {
  const [year, month] = item.month.split(", ");
  Object.keys(item.neighbourhoods).forEach((neighbourhood) => {
    if (!categories[neighbourhood]) categories[neighbourhood] = true;
  });
  return {
    name: `${month}/${year.slice(2)}`,
    ...item.neighbourhoods,
  };
};
const buildData = (data: Data[], mode: string) => {
  const categories: Categories = {};
  const groupedData: ChartItem[] = data.map((item) => {
    switch (mode) {
      case "categories":
        return buildCategories(item, categories);
      case "neighbourhoods":
        return buildNeighbourhoods(item, categories);
      case "total":
        return buildTotal(item, categories);
      default:
        return {};
    }
  });
  return { categories, groupedData };
};

export const useData = () => {
  const [groupedData, categories, colors] = useMemo(() => {
    const { categories, groupedData } = buildData(data, "categories");
    const categoryArray = Object.keys(categories);
    const spacing = 1 / (categoryArray.length - 1 || 1);
    const colors = categoryArray.map((category, index) =>
      interpolateSinebow(index * spacing)
    );
    return [groupedData, categoryArray.sort(), colors];
  }, []);

  return { groupedData, categories, colors };
};
