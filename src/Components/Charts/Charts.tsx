import { useState } from "react";
import { Container, UIContainer } from "./ChartsStyle";
import Buttons from "./Components/Buttons/Buttons";
import Chart1 from "./Components/Chart1/Chart1";
import Filters from "./Components/Filters/Filters";

export enum Mode {
  Total,
  Categories,
  Neighbourhoods,
}

export interface Data {
  month: string;
  categories: {
    [index: string]: number | undefined;
  };
  neighbourhoods: {
    [index: string]: number | undefined;
  };
}

export default function Charts() {
  const [mode, setMode] = useState<Mode>(Mode.Total);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  return (
    <Container>
      <UIContainer>
        <Buttons mode={mode} setMode={setMode} />
        <Filters mode={mode} setFilteredData={setFilteredData} />
      </UIContainer>
      <Chart1 mode={mode} filteredData={filteredData} />
    </Container>
  );
}
