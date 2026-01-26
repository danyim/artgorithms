import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { Checkbox } from "../../Checkbox";

interface Props {
  width?: number;
  height?: number;
}

const DEFAULT_SPACE = 5;
const DEFAULT_SIZE = 1;

export const Farben = ({ width = 1000, height = 450 }: Props) => {
  const [space, setSpace] = React.useState<number>(DEFAULT_SPACE);
  const [size, setSize] = React.useState<number>(DEFAULT_SIZE);
  const [outline, setOutline] = React.useState<boolean>(false);

  const handleReset = () => {
    setSpace(DEFAULT_SPACE);
    setSize(DEFAULT_SIZE);
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
          label: "Size",
          minStepMax: [1, 1, 10],
          value: size,
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
        outline={outline}
      />
    </ArtworkLayout>
  );
};

export default Farben;
