import { Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";

export const StyledPopper = styled(Popper)({
  width: "auto !important",
});

export const StyledAutocomplete = styled(Autocomplete)({
  marginBottom: 10,
  width: 165,
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "&.Mui-focused .MuiInputLabel-root": {
    color: "white !important",
  },
  "& .MuiButtonBase-root": {
    color: "white",
  },
  "& .MuiChip-root": {
    display: "none",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white  !important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white !important",
  },
});
