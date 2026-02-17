import React from "react";
import ReactSlider from "./ReactSlider";
import styled from "styled-components";

const Container = styled.div`
  margin: 0.4rem 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const LabelContainer = styled.div<{ $locked?: boolean }>`
  flex-shrink: 0;
  padding-right: 0.5rem;
  cursor: pointer;
  user-select: none;
  opacity: ${({ $locked }) => ($locked ? 0.5 : 1)};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Label = styled.label`
  font:
    normal 400 0.8rem/1rem Inter,
    sans-serif;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  white-space: nowrap;
`;

const MouseAxisIndicator = styled.span<{ $axis: "horizontal" | "vertical" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.3);
  font-size: 0.7rem;
  margin-left: 0.25rem;
  width: 1.2rem;

  .arrow {
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1;
    text-align: center;
    transform: ${({ $axis }) => ($axis === "vertical" ? "rotate(90deg)" : "none")};
  }
`;

const LockIndicator = styled.span<{ $locked?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
  width: 1rem;

  svg {
    width: 0.6rem;
    height: 0.6rem;
    fill: rgba(0, 0, 0, ${({ $locked }) => ($locked ? 0.5 : 0.2)});
    transition: fill 0.15s ease;
  }
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
  mouseAxis?: "horizontal" | "vertical";
  locked?: boolean;
  onToggleLock?: (key: string) => void;
}

export const Slider = ({
  keyName,
  value,
  minStepMax,
  label,
  handleChange,
  mouseAxis,
  locked = false,
  onToggleLock,
}: Props) => {
  const [min, step, max] = minStepMax;
  const [position, setPosition] = React.useState(value);

  const handleOnChange = (value: number) => {
    setPosition(value);
    handleChange(keyName, value);
  };

  const handleLabelClick = () => {
    onToggleLock?.(keyName);
  };

  return (
    <Container>
      <LabelContainer $locked={locked} onClick={handleLabelClick}>
        <Label htmlFor={keyName}>
          {label}
          {mouseAxis && <MouseAxisIndicator $axis={mouseAxis}><span className="arrow">↔</span></MouseAxisIndicator>}
          <LockIndicator $locked={locked}>
            {locked ? (
              <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/></svg>
            )}
          </LockIndicator>
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
