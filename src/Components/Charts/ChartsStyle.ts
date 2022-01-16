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
  height: calc(100vh - 75px);
  width: calc(100vw - 400px);
  overflow: hidden;
  user-select: none;
`;
export const ZoomOutContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 55px;
  color: white;
  height: 35px;
  width: 35px;
`;
export const UIContainer = styled.div`
  position: absolute;
  top: 75px;
  left: 5px;
`;
export const UISubContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  text-align: center;
  border: 1px solid white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
  width: 165px;
`;
