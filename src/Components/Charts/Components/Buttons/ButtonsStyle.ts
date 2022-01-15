import styled from "styled-components";

interface Props {
  Button: {
    selected: boolean;
  };
}
export const ButtonsContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 5px;
  display: flex;
  flex-direction: column;
  color: white;
  text-align: center;
  border: 1px solid white;
  border-radius: 10px;
  padding: 15px;
`;
export const Button = styled.div<Props["Button"]>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ selected }) => (selected ? "lime" : "rgb(200, 200, 200)")};
  border-radius: 10px;
  margin: 5px 0;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(200, 200, 200, 0.2);
  }
`;
export const Title = styled.div`
  margin-bottom: 15px;
  font-weight: 600;
`;
