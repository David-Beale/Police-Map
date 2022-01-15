import styled from "styled-components";

export const TooltipContainer = styled.div`
  background-color: #4c4177;
  background-image: linear-gradient(
    315deg,
    hsl(204, 45%, 15%) 0%,
    hsl(252, 35%, 20%) 70%
  );
  padding: 15px;
  border-radius: 15px;
  border: 3px groove rgb(200, 200, 200);
`;
export const TooltipLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  color: rgb(200, 200, 200);
`;
export const TooltipRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ color }) => color};
`;
export const TooltipValue = styled.div`
  margin-left: 8px;
`;
