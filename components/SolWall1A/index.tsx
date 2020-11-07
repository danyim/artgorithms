import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import Slider from "../Slider";
import CanvasInputs from "../CanvasInputs";

interface Props {}

export const CanvasContainer = () => {
  const [space, setSpace] = React.useState(10);
  const [lineWidth, setLineWidth] = React.useState(3);

  const handleReset = () => {
    setSpace(10);
    setLineWidth(3);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "space":
        setSpace(val);
        return;
      case "lineWidth":
        setLineWidth(val);
        return;
    }
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={500} height={500} space={space} lineWidth={lineWidth} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Wall Drawing 1: Drawing Series II 18 A (1968)"
          artistName="Sol LeWitt"
          description={() => (
            <>
              <small>
                <a href="https://www.sfmoma.org/artwork/FC.474.2">SF MOMA</a>
                ,&nbsp;
                <a href="http://www.ideelart.com/module/csblog/post/177-1-sol-lewitt-wall-drawings.html">
                  IdeelArt
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
                <Slider
                  keyName="lineWidth"
                  label="Line"
                  minStepMax={[1, 2, 10]}
                  value={lineWidth}
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

export default CanvasContainer;
