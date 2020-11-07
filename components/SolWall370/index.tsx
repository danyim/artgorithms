import React from "react";
import Canvas from "./Canvas";
import CanvasSquare from "./CanvasSquare";
import CanvasX from "./CanvasX";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

export const SolWall370CanvasContainer = () => {
  const [space, setSpace] = React.useState(10);
  const handleReset = () => {
    setSpace(10);
  };

  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={300} height={300} space={space} />
        <CanvasSquare width={300} height={300} space={space} />
        <CanvasX width={300} height={300} space={space} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Wall Drawing #370"
          artistName="Sol LeWitt"
          description={() => (
            <>
              <small>
                <a href="https://www.metmuseum.org/exhibitions/listings/2014/sol-lewitt">
                  NYC MET
                </a>
              </small>
              <CanvasInputs onReset={handleReset}>
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
