import React from "react";
import MapIcon from "@mui/icons-material/Map";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Modes } from "../../App";
import { Container, StyledIconButton } from "./ModeSelectButtonStyle";
import { Tooltip } from "@mui/material";

interface Props {
  mode: Modes;
  setMode: React.Dispatch<React.SetStateAction<Modes>>;
}
export default function ModeSelectButton({ mode, setMode }: Props) {
  const onClick = () => {
    setMode((prev) => (prev === Modes.Map ? Modes.Charts : Modes.Map));
  };
  const getTitle = () => {
    switch (mode) {
      case Modes.Map:
        return "Switch to chart view";
      case Modes.Charts:
        return "Switch to map view";

      default:
        return "";
    }
  };
  return (
    <Container>
      <Tooltip title={getTitle()}>
        <StyledIconButton onClick={onClick}>
          {
            {
              [Modes.Map]: <ShowChartIcon />,
              [Modes.Charts]: <MapIcon />,
            }[mode]
          }
        </StyledIconButton>
      </Tooltip>
    </Container>
  );
}
