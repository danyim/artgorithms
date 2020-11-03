import styled from "styled-components";

const Container = styled.div`
  margin: 2rem 1rem;
`;

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const CanvasInputs = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
export default CanvasInputs;
