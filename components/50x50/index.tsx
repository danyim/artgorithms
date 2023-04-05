import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

const DEFAULT_VALUE = 2458;

export const TemplateCanvasContainer = () => {
  const [pattern, setPattern] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setPattern(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setPattern(val);
    console.log("key", key);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={384} height={512} pattern={pattern} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="50/50"
          artistName="Tauba Auerbach"
          year="2008"
          description={() => (
            <>
              <h4 className="placard-title">Instructions</h4>
              <p className="placard">
                A repeating pattern of 3x4 squares on a 16x16 grid
              </p>
              <small>
                <a href="https://taubaauerbach.com/view.php?id=133">
                  Tauba Auerbach
                </a>
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="pattern"
                  label="Pattern"
                  minStepMax={[2, 14, 4095]}
                  value={pattern}
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

export default TemplateCanvasContainer;
