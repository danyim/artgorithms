import React from "react";
import styled from "styled-components";

const Container = styled.div`
  label {
    font: normal 500 0.85rem/1rem Abel;
    text-transform: uppercase;
    display: block;
  }

  input[type="range"] {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;

    &::-webkit-slider-thumb {
      --webkit-appearance: none;
      border: 1px solid #000000;
      height: 10px;
      width: 2px;
      cursor: pointer;
      margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: white;
      border-radius: 0;
      border-top: 1px dashed black;
      border-color: gray;
    }

    &:focus::-webkit-slider-runnable-track {
      border-color: black;
    }

    &:focus {
      outline: none;
    }
  }
`;

interface Props {
  keyName: string;
  minStepMax: [number, number, number];
  value: number;
  label: string;
  handleChange: (key: string, val: number) => void;
}

export const Slider = ({
  keyName,
  value,
  minStepMax,
  label,
  handleChange,
}: Props) => {
  const [min, step, max] = minStepMax;
  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    handleChange(keyName, parseInt((e.target as HTMLInputElement).value, 10));
  };

  return (
    <Container>
      <label htmlFor={keyName}>
        {label} <small>{value}</small>
      </label>
      <input
        name={keyName}
        className="mdl-slider"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onInput={handleOnInput}
      />
    </Container>
  );
};

export default Slider;
