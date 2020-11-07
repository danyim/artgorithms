import styled from "styled-components";

const Container = styled.div`
  margin: 2rem 1rem;

  display: flex;
  flex-flow: column nowrap;

  .reset {
    font-family: Abel;
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
      {children}
      <button className="reset" onClick={onReset}>
        Reset
      </button>
    </Container>
  );
};
export default CanvasInputs;
