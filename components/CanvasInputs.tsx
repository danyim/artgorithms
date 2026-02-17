import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 2rem 0;

  display: flex;
  flex-flow: column nowrap;

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .actions button {
    font: normal 400 0.8rem/1rem Inter, sans-serif;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

interface Props {
  children?: React.ReactNode;
  onReset: () => void;
  onRandom?: () => void;
}

export const CanvasInputs = ({ children, onReset, onRandom }: Props) => {
  return (
    <Container>
      <h4 className="placard-title">Controls</h4>
      {children}
      <div className="actions">
        {onRandom && (
          <button className="hover:opacity-50 transition-opacity" onClick={onRandom}>Random</button>
        )}
        <button className="hover:opacity-50 transition-opacity" onClick={onReset}>Reset</button>
      </div>
    </Container>
  );
};
export default CanvasInputs;
