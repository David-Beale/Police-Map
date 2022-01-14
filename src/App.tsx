import "./App.css";
import React, { useState } from "react";
import Map from "./Components/Map/Map";
import ModeSelectButton from "./Components/ModeSelectButton/ModeSelectButton";
import Charts from "./Components/Charts/Charts";

export const enum Modes {
  Map,
  Charts,
}
export default function App() {
  const [mode, setMode] = useState(Modes.Charts);

  return (
    <>
      <ModeSelectButton mode={mode} setMode={setMode} />
      {
        {
          [Modes.Map]: <Map />,
          [Modes.Charts]: <Charts />,
        }[mode]
      }
    </>
  );
}
