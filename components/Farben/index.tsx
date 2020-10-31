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

  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  return (
    <div>
      <div className="mdl-cell mdl-cell--12-col">
        <Canvas width={width} height={height} space={space} />
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
                  minStepMax={[5, 5, 50]}
                  value={space}
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
