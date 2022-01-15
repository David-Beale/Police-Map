import { useMemo } from "react";
import data from "../../Data/chartData.json";
import { interpolateSinebow } from "d3-scale-chromatic";

interface Categories {
  [index: string]: boolean;
}
export interface ChartItem {
  name: number;
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

const buildTotal = (item: Data, categories: Categories) => {
  categories.crimes = true;

  const total = Object.values(item.categories).reduce(
    (a = 0, b = 0) => a + b,
    0
  );
  return {
    crimes: total,
  };
};
const buildCategories = (item: Data, categories: Categories) => {
  Object.keys(item.categories).forEach((category) => {
    if (!categories[category]) categories[category] = true;
  });
  return {
    ...item.categories,
  };
};
const buildNeighbourhoods = (item: Data, categories: Categories) => {
  Object.keys(item.neighbourhoods).forEach((neighbourhood) => {
    if (!categories[neighbourhood]) categories[neighbourhood] = true;
  });
  return {
    ...item.neighbourhoods,
  };
};
const getDataByMode = (mode: string, item: Data, categories: Categories) => {
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
};
const buildData = (data: Data[], mode: string) => {
  const xAxisLabels: string[] = [];
  const categories: Categories = {};
  const groupedData: ChartItem[] = data.map((item, index) => {
    const [year, month] = item.month.split(", ");
    xAxisLabels.push(`${month}/${year.slice(2)}`);

    return {
      name: index,
      ...getDataByMode(mode, item, categories),
    };
  });
  return { categories, groupedData, xAxisLabels };
};

export const useData = () => {
  return useMemo(() => {
    const { categories, groupedData, xAxisLabels } = buildData(
      data,
      "categories"
    );
    const categoryArray = Object.keys(categories);
    const spacing = 1 / (categoryArray.length - 1 || 1);
    const colors = categoryArray.map((category, index) =>
      interpolateSinebow(index * spacing)
    );
    return {
      groupedData,
      categories: categoryArray.sort(),
      xAxisLabels,
      colors,
    };
  }, []);
};
