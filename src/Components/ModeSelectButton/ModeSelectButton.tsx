import React from "react";
import MapIcon from "@mui/icons-material/Map";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Modes } from "../../App";
import { Container, StyledIconButton } from "./ModeSelectButtonStyle";

interface Props {
  mode: Modes;
  setMode: React.Dispatch<React.SetStateAction<Modes>>;
}
export default function ModeSelectButton({ mode, setMode }: Props) {
  const onClick = () => {
    setMode((prev) => (prev === Modes.Map ? Modes.Charts : Modes.Map));
  };
  return (
    <Container>
      <StyledIconButton onClick={onClick}>
        {
          {
            [Modes.Map]: <ShowChartIcon />,
            [Modes.Charts]: <MapIcon />,
          }[mode]
        }
      </StyledIconButton>
    </Container>
  );
}
