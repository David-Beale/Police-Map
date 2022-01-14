import { IconButton } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;
export const StyledIconButton = styled(IconButton)`
  color: black !important;
  background-color: white !important;
  height: 55px;
  width: 55px;
`;
