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
  background-color: #c2fadb !important;
  background-image: linear-gradient(315deg, #6daddb 0%, #c2fadb 74%) !important;
  height: 55px;
  width: 55px;
`;
