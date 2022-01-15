import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: #4c4177;
  background-image: linear-gradient(
    315deg,
    hsl(252, 35%, 20%) 0%,
    hsl(204, 45%, 15%) 60%
  );
  padding-top: 75px;
  display: flex;
  justify-content: center;
`;

export const ChartContainer = styled.div`
  height: 75vh;
  width: 75vw;
  overflow: hidden;
  user-select: none;
`;
export const ZoomOutContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  height: 35px;
  width: 35px;
`;
