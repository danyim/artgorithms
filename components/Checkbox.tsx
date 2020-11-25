import React from "react";
import styled from "styled-components";

const Container = styled.div`
  label {
    font: normal 500 0.85rem/1rem "Abel", sans-serif;
    text-transform: uppercase;
    display: block;
  }

  input[type="checkbox"] {
  }
`;

interface Props {
  keyName: string;
  value: boolean;
  label: string;
  handleChange: (key: string, val: boolean) => void;
}

export const Checkbox = ({ keyName, value, label, handleChange }: Props) => {
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleChange(keyName, (e.target as HTMLInputElement).checked);
  };

  return (
    <Container>
      <label htmlFor={keyName}>{label}</label>
      <input
        name={keyName}
        type="checkbox"
        checked={value}
        onChange={handleOnChange}
      />
    </Container>
  );
};

export default Checkbox;
