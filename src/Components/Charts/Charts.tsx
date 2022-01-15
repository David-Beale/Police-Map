import { useState } from "react";
import { Container } from "./ChartsStyle";
import Buttons from "./Components/Buttons/Buttons";
import Chart1 from "./Components/Chart1/Chart1";

export enum Mode {
  Total,
  Categories,
  Neighbourhoods,
}
export default function Charts() {
  const [mode, setMode] = useState<Mode>(Mode.Total);
  return (
    <Container>
      <Buttons mode={mode} setMode={setMode} />
      <Chart1 mode={mode} />
    </Container>
  );
}
