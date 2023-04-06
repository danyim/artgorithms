import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

const DEFAULT_VALUE = 12;

export const DoubleConcentricContainer = () => {
  const [bands, setBands] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setBands(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setBands(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={500} height={250} bands={bands} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Double Concentric: Scramble"
          artistName="Frank Stella"
          year="1971"
          description={() => (
            <>
              <small>
                <a href="https://www.sfmoma.org/artwork/FC.311/">SF MOMA</a>
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="bands"
                  label="Bands"
                  minStepMax={[2, 1, 20]}
                  value={bands}
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

export default DoubleConcentricContainer;
