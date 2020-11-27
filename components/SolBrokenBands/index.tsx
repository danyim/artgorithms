import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

export const SolBrokenBandsCanvasContainer = () => {
  const [saturation, setSaturation] = React.useState(100);

  const handleReset = () => {
    setSaturation(100);
  };

  const handleChange = (key: string, val: number) => {
    setSaturation(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={800} height={200} saturation={saturation} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Broken Color Bands in Four Directions"
          artistName="Sol LeWitt"
          year="2005"
          description={() => (
            <>
              <small>
                <a href="https://www.sollewittprints.org/artwork/lewitt-raisonne-2005-04/">
                  Sol LeWitt Prints
                </a>
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="saturation"
                  label="Saturation"
                  minStepMax={[0, 1, 10]}
                  value={saturation}
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

export default SolBrokenBandsCanvasContainer;
