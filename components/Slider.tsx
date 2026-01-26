import React from "react";
import ReactSlider from "./ReactSlider";
import styled from "styled-components";

const Container = styled.div`
  margin: 0.4rem 0;
  display: flex;
  flex-flow: row nowrap;
`;

const LabelContainer = styled.div`
  flex-shrink: 0;
  padding-right: 0.5rem;
`;

const Label = styled.label`
  font:
    normal 400 0.8rem/1rem Inter,
    sans-serif;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  white-space: nowrap;
`;

const SliderContainer = styled.div`
  flex: 1 1 auto;
  min-width: 100px;

  // & .slider-track:nth-child(1) {
  //   background: linear-gradient(
  //     90deg,
  //     rgba(255, 255, 255, 0) 0%,
  //     rgba(255, 255, 255, 1) 100%
  //   );
  // }
`;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 20px;

  .slider-track {
    margin-top: 10px;
    border-bottom: 1px dashed black;
  }
`;

const StyledTrack = styled.img`
  top: 0;
  bottom: 0;
`;

const StyledPlainTrack = styled.div<{ $index: number }>`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.$index === 2 ? "#f00" : props.$index === 1 ? "#0f0" : "#ddd"};
  border-radius: 999px;
`;
// const Track = (props, state) => (
//   // <StyledTrack src={TrackSvg} height="20" />
//   <StyledPlainTrack $index={state.index} />
// );
const Track = (props: Record<string, unknown>) => {
  const { key, ...rest } = props;
  return <StyledTrack key={key as React.Key} {...rest} />;
};

const StyledThumb = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  line-height: ${({ height }) => height}px;
  width: 1px;
  border-right: 1px solid black;
  top: 0;
  cursor: grab;
  transition: 0.2s all ease-out;

  &.thumb-active {
    outline: 0;
  }
`;
const Thumb = (props: Record<string, unknown>) => {
  const { key, ...rest } = props;
  return <StyledThumb key={key as React.Key} height={20} {...rest} />;
};

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
  const [position, setPosition] = React.useState(value);

  const handleOnChange = (value: number) => {
    setPosition(value);
    handleChange(keyName, value);
  };

  return (
    <Container>
      <LabelContainer>
        <Label htmlFor={keyName}>
          {label}
          {/* ({position}) */}
        </Label>
      </LabelContainer>
      <SliderContainer>
        <div>
          <StyledSlider
            thumbActiveClassName="thumb-active"
            trackClassName="slider-track"
            value={value}
            min={min}
            max={max}
            step={step}
            // renderTrack={Track}
            renderThumb={Thumb}
            onChange={handleOnChange}
          />
        </div>
      </SliderContainer>
    </Container>
  );
};

export default Slider;
