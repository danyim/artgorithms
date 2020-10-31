import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {
  width?: number;
  height?: number;
}

export const Farben = ({ width = 1000, height = 450 }: Props) => {
  const [space, setSpace] = React.useState(5);
  const [size, setSize] = React.useState(1);

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

  return (
    <div>
      <div className="mdl-cell mdl-cell--12-col">
        <Canvas width={width} height={height} space={space} size={size} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="256 Farben (1974/1984)"
          artistName="Gerhard Richter"
          description={() => (
            <>
              <small>
                <a href="https://www.sfmoma.org/artwork/FC.643">SF MOMA</a>
              </small>

              <CanvasInputs>
                <Slider
                  keyName="space"
                  label="Spacing"
                  minStepMax={[5, 5, 20]}
                  value={space}
                  handleChange={handleChange}
                />
                <Slider
                  keyName="size"
                  label="Size"
                  minStepMax={[1, 1, 10]}
                  value={size}
                  handleChange={handleChange}
                />
              </CanvasInputs>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Farben;
