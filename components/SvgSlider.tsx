import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0.5rem 0;
`;

const Label = styled.label`
  font: normal 400 0.85rem/1rem Inter;
  text-transform: uppercase;
  min-width: 50px;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 20px;
  position: relative;
`;

const Thumb = styled.div.attrs<{ height: number; position: number }>(
  (props) => ({
    style: { left: `${props.position}%` },
  })
)`
  position: absolute;
  top: 0;
  // left: ${({ position }) => position}%;
  height: ${({ height }) => height}px;
  width: 0;
  padding: 1rem;
  border-right: 1px solid black;
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
  const [isLifted, setIsLifted] = React.useState(false);
  const [position, setPosition] = React.useState(75);
  const containerRef = React.useRef<HTMLDivElement>();
  const [min, step, max] = minStepMax;
  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    handleChange(keyName, parseInt((e.target as HTMLInputElement).value, 10));
  };

  const handleMouseMove = (e) => {
    if (isLifted && containerRef.current) {
      const boundingBox = containerRef.current.getBoundingClientRect();
      const clientXCanvas =
        Math.max(e.clientX - boundingBox.left, 0) / boundingBox.width;
      // const clientYCanvas =
      //   Math.max(e.clientY - boundingBox.top, 0) / boundingBox.height;
      setPosition(Math.min(100, Math.floor(clientXCanvas * 100)));
      console.log(
        "handleMouseMove: @",
        Math.min(100, Math.floor(clientXCanvas * 100))
      );
    }
  };

  const handleMouseDown = () => {
    setIsLifted(true);
  };

  const clearLift = () => setIsLifted(false);

  const handleMouseUp = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const boundingBox = containerRef.current.getBoundingClientRect();
      console.log(boundingBox);
      const clientXCanvas =
        Math.max(e.clientX - boundingBox.left, 0) / boundingBox.width;
      // const clientYCanvas =
      //   Math.max(e.clientY - boundingBox.top, 0) / boundingBox.height;
      setPosition(Math.min(100, Math.floor(clientXCanvas * 100)));
      setIsLifted(false);
      console.log(
        "handleMouseUp: @ ",
        Math.min(100, Math.floor(clientXCanvas * 100))
      );
      console.log("handleMouseUp: lifted?", isLifted);
    }
  };

  const sliderHeight = 20;

  return (
    <Container>
      <Label htmlFor={keyName}>{label}</Label>
      <SliderContainer
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={clearLift}
      >
        <svg
          width="100%"
          height={sliderHeight}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(0)">
              <stop offset="0%" stopColor="black" stopOpacity="0.3" />
              <stop offset="50%" stopColor="black" stopOpacity="1" />
              <stop offset="100%" stopColor="black" stopOpacity="0.3" />
            </linearGradient>
            <mask id="gradient-mask">
              {/* <rect
                x="0"
                y={0}
                width="100%"
                height={sliderHeight}
                fill="url(#gradient)"
              /> */}
              {/* <line
                x1="0"
                y1="1"
                x2="600"
                y2="1"
                stroke="black"
                strokeDasharray="3 5"
                mask="url(#gradient)"
              /> */}
            </mask>
          </defs>
          {/* <rect
            x="0"
            y={0}
            width="100%"
            height={sliderHeight}
            fill="url(#gradient)"
          /> */}
          <line
            x1="0"
            y1={sliderHeight / 2}
            x2="100%"
            y2={sliderHeight / 2}
            stroke="black"
            strokeDasharray="3 5"
            // mask="url(#gradient-mask)"
          />
        </svg>
        <Thumb
          height={sliderHeight}
          position={position}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </SliderContainer>
      {/* <input
        name={keyName}
        className="mdl-slider"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onInput={handleOnInput}
      /> */}
    </Container>
  );
};

export default Slider;
