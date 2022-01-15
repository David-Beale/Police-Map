import { Mode } from "../../Charts";
import { ButtonsContainer, Button, Title } from "./ButtonsStyle";

interface Props {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export default function Buttons({ mode, setMode }: Props) {
  return (
    <ButtonsContainer>
      <Title>Display Options</Title>
      <Button
        selected={mode === Mode.Total}
        onClick={() => setMode(Mode.Total)}
      >
        Total
      </Button>
      <Button
        selected={mode === Mode.Categories}
        onClick={() => setMode(Mode.Categories)}
      >
        Categories
      </Button>
      <Button
        selected={mode === Mode.Neighbourhoods}
        onClick={() => setMode(Mode.Neighbourhoods)}
      >
        Neighbourhoods
      </Button>
    </ButtonsContainer>
  );
}
