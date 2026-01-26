import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { Checkbox } from "../../Checkbox";

const DEFAULT_SIZE = 6;
const DEFAULT_COLOR_MODE = false;
const DEFAULT_SHRINK_FACTOR = 92;
const DEFAULT_MIN_COVERAGE = 35;
const DEFAULT_MIN_ANGLE = 8;
const DEFAULT_MAX_ANGLE = 88;

export const UnknownCanvasContainer = () => {
  const [size, setSize] = React.useState(DEFAULT_SIZE);
  const [colorMode, setColorMode] = React.useState(DEFAULT_COLOR_MODE);
  const [shrinkFactor, setShrinkFactor] = React.useState(DEFAULT_SHRINK_FACTOR);
  const [minCoverage, setMinCoverage] = React.useState(DEFAULT_MIN_COVERAGE);
  const [minAngle, setMinAngle] = React.useState(DEFAULT_MIN_ANGLE);
  const [maxAngle, setMaxAngle] = React.useState(DEFAULT_MAX_ANGLE);

  const handleReset = () => {
    setSize(DEFAULT_SIZE);
    setColorMode(DEFAULT_COLOR_MODE);
    setShrinkFactor(DEFAULT_SHRINK_FACTOR);
    setMinCoverage(DEFAULT_MIN_COVERAGE);
    setMinAngle(DEFAULT_MIN_ANGLE);
    setMaxAngle(DEFAULT_MAX_ANGLE);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "size":
        setSize(val);
        return;
      case "shrinkFactor":
        setShrinkFactor(val);
        return;
      case "minCoverage":
        setMinCoverage(val);
        return;
      case "minAngle":
        setMinAngle(val);
        return;
      case "maxAngle":
        setMaxAngle(val);
        return;
    }
  };

  const handleCheckboxChange = (key: string, val: boolean) => {
    if (key === "colorMode") {
      setColorMode(val);
    }
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Unknown",
        artistName: "Unknown",
        year: "Unknown",
      }}
      controls={[
        {
          key: "size",
          label: "Size",
          minStepMax: [2, 1, 12],
          value: size,
          onChange: handleChange,
        },
        {
          key: "shrinkFactor",
          label: "Padding",
          minStepMax: [50, 1, 100],
          value: shrinkFactor,
          onChange: handleChange,
        },
        {
          key: "minCoverage",
          label: "Min Coverage",
          minStepMax: [10, 5, 80],
          value: minCoverage,
          onChange: handleChange,
        },
        {
          key: "minAngle",
          label: "Min Angle",
          minStepMax: [5, 1, 45],
          value: minAngle,
          onChange: handleChange,
        },
        {
          key: "maxAngle",
          label: "Max Angle",
          minStepMax: [45, 1, 120],
          value: maxAngle,
          onChange: handleChange,
        },
      ]}
      customControls={
        <Checkbox
          keyName="colorMode"
          label="Color"
          value={colorMode}
          handleChange={handleCheckboxChange}
        />
      }
      onReset={handleReset}
    >
      <Canvas
        width={500}
        height={500}
        size={size}
        colorMode={colorMode}
        shrinkFactor={shrinkFactor / 100}
        minCoverage={minCoverage / 100}
        minAngle={minAngle}
        maxAngle={maxAngle}
      />
    </ArtworkLayout>
  );
};

export default UnknownCanvasContainer;
