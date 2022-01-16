import { UISubContainer } from "../../ChartsStyle";
import { Title } from "./FiltersStyle";
import Filter from "./Components/Filter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Data, Mode } from "../../Charts";

interface Props {
  mode: Mode;
  setFilteredData: React.Dispatch<React.SetStateAction<Data[]>>;
}
export default function Filters({ mode, setFilteredData }: Props) {
  const [data, setData] = useState<Data[]>([]);

  const getAllLabels = useCallback(
    (type: "categories" | "neighbourhoods") => {
      let all = {};
      data.forEach((month) => {
        all = { ...all, ...month[type] };
      });
      return Object.keys(all).sort();
    },
    [data]
  );

  const allNeigbourhoods = useMemo(
    () => getAllLabels("neighbourhoods"),
    [getAllLabels]
  );
  const allCategories = useMemo(
    () => getAllLabels("categories"),
    [getAllLabels]
  );

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [neighbourhoodFilter, setNeighbourhoodFilter] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("./data/chartData.json");
      if (res.status !== 200) return;
      const data = await res.json();
      setData(data);
    })();
  }, []);

  useEffect(() => {
    if (!data.length) return;
    const filteredData = data.map((d: Data) => {
      const newD: Data = {
        month: d.month,
        categories: {},
        neighbourhoods: {},
      };
      if (categoryFilter.length) {
        categoryFilter.forEach((category) => {
          if (d.categories[category]) {
            newD.categories[category] = d.categories[category];
          }
        });
      } else {
        newD.categories = d.categories;
      }
      if (neighbourhoodFilter.length) {
        neighbourhoodFilter.forEach((neighbourhood) => {
          if (d.neighbourhoods[neighbourhood]) {
            newD.neighbourhoods[neighbourhood] =
              d.neighbourhoods[neighbourhood];
          }
        });
      } else {
        newD.neighbourhoods = d.neighbourhoods;
      }
      return newD;
    });
    setFilteredData(filteredData);
  }, [categoryFilter, neighbourhoodFilter, setFilteredData, data]);

  if (mode === Mode.Total) return null;
  return (
    <UISubContainer>
      <Title>Filter Data</Title>
      {mode === Mode.Categories && (
        <Filter
          allOptions={allCategories}
          filter={categoryFilter}
          setFilter={setCategoryFilter}
          name="Categories"
        />
      )}
      {mode === Mode.Neighbourhoods && (
        <Filter
          allOptions={allNeigbourhoods}
          filter={neighbourhoodFilter}
          setFilter={setNeighbourhoodFilter}
          name="Neighbourhoods"
        />
      )}
    </UISubContainer>
  );
}
