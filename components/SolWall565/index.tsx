import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {
  width?: number;
  height?: number;
}

export const CanvasContainer = ({ width = 500, height = 400 }: Props) => {
  const [area, setArea] = React.useState(2500);

  const handleChange = (key: string, val: number) => {
    setArea(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={width} height={height} area={area} />
      </div>
      <Placard
        title="Wall Drawing 565 (1988)"
        artistName="Sol LeWitt"
        description={() => (
          <>
            <h5>(WORK IN PROGRESS)</h5>
            <small>
              <a href="https://www.sfmoma.org/artwork/2000.440">SF MOMA</a>
            </small>
            <CanvasInputs>
              <Slider
                keyName="area"
                label="Spacing"
                minStepMax={[5, 5, 50]}
                value={area}
                handleChange={handleChange}
              />
            </CanvasInputs>
          </>
        )}
      />
    </div>
  );
};

export default CanvasContainer;
