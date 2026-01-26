import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { Checkbox } from "../../Checkbox";

interface Props {
  width?: number;
  height?: number;
}

const DEFAULT_SPACE = 5;
const DEFAULT_SIZE = 16;
const DEFAULT_SATURATION = 75;

export const Farben = ({ width = 1000, height = 450 }: Props) => {
  const [space, setSpace] = React.useState<number>(DEFAULT_SPACE);
  const [size, setSize] = React.useState<number>(DEFAULT_SIZE);
  const [saturation, setSaturation] = React.useState<number>(DEFAULT_SATURATION);
  const [outline, setOutline] = React.useState<boolean>(false);

  const handleReset = () => {
    setSpace(DEFAULT_SPACE);
    setSize(DEFAULT_SIZE);
    setSaturation(DEFAULT_SATURATION);
    setOutline(false);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "space":
        setSpace(val);
        return;
      case "size":
        setSize(val);
        return;
      case "saturation":
        setSaturation(val);
        return;
    }
  };

  const handleCheckboxChange = (key: string, val: boolean) => {
    if (key === "outline") {
      setOutline(val);
    }
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "256 Farben",
        artistName: "Gerhard Richter",
        year: "1974",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.643" },
        ],
      }}
      controls={[
        {
          key: "space",
          label: "Spacing",
          minStepMax: [5, 5, 20],
          value: space,
          onChange: handleChange,
        },
        {
          key: "size",
          label: "Columns",
          minStepMax: [4, 1, 16],
          value: size,
          onChange: handleChange,
        },
        {
          key: "saturation",
          label: "Saturation",
          minStepMax: [15, 5, 100],
          value: saturation,
          onChange: handleChange,
        },
      ]}
      customControls={
        <Checkbox
          keyName="outline"
          label="Outline"
          value={outline}
          handleChange={handleCheckboxChange}
        />
      }
      onReset={handleReset}
    >
      <Canvas
        width={width}
        height={height}
        space={space}
        size={size}
        saturation={saturation}
        outline={outline}
      />
    </ArtworkLayout>
  );
};

export default Farben;
