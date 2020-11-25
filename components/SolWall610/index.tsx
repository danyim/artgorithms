import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

export const SolWall610CanvasContainer = () => {
  const [colorIndex, setColorIndex] = React.useState(0);

  const handleReset = () => {
    setColorIndex(0);
  };

  const handleChange = (key: string, val: number) => {
    setColorIndex(val);
  };

  const handleOnMouseMove = () => {
    setColorIndex((colorIndex + 1) % 10);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas
          width={500}
          height={500}
          colorIndex={colorIndex}
          handleOnMouseMove={handleOnMouseMove}
        />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Wall Drawing #610"
          artistName="Sol LeWitt"
          year="1989"
          description={() => (
            <>
              <small>
                <a href="https://www.artsy.net/show/yale-university-art-gallery-sol-lewitt-wall-drawings-expanding-a-legacy">
                  Artsy
                </a>
                <a href="https://massmoca.org/event/walldrawing610/">MoCA</a>
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="colorIndex"
                  label="Color"
                  minStepMax={[0, 1, 10]}
                  value={colorIndex}
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
