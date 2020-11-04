import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

export const SolCubeFormsCanvasContainer = () => {
  const [space, setSpace] = React.useState(10);
  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={500} height={500} space={space} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="
          Art Title"
          artistName="Unknown"
          description={() => (
            <>
              <small>
                {/* <a href="https://www.sfmoma.org/artwork/FC.474.2">SF MOMA</a> */}
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
