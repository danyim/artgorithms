import styled from "styled-components";

const Container = styled.div`
  margin: 2rem 0;

  display: flex;
  flex-flow: column nowrap;

  .reset {
    font: normal 400 0.8rem/1rem Inter, sans-serif;
    text-transform: uppercase;
    margin-top: 30px;
    align-self: flex-end;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

interface Props {
  children?: JSX.Element | JSX.Element[];
  onReset: () => void;
}

export const CanvasInputs = ({ children, onReset }: Props) => {
  return (
    <Container>
      <h4 className="placard-title">Controls</h4>
      {children}
      <button className="reset" onClick={onReset}>
        Reset
      </button>
    </Container>
  );
};
export default CanvasInputs;
