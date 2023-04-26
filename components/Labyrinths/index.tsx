import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

const DEFAULT_VALUE = 0;

export const TemplateCanvasContainer = () => {
  const [pattern, setPattern] = React.useState(DEFAULT_VALUE);

  const handleReset = () => {
    setPattern(DEFAULT_VALUE);
  };

  const handleChange = (key: string, val: number) => {
    setPattern(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={500} height={500} pattern={pattern} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Hermetic One-way Labyrinths"
          artistName="Thomas Laubenberger"
          year="2011"
          description={() => (
            <>
              <small>
                <a href="https://www.instagram.com/p/B2oFOHcF3qQ">
                  Thomas Laubenberger
                </a>
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="pattern"
                  label="Pattern"
                  minStepMax={[0, 1, 25]}
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
