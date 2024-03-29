import React from "react";
import Canvas from "./Canvas";
import CirclesCanvas from "./CirclesCanvas";
import { CompositeCanvas1 } from "./CompositeCanvas1";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";
import { CompositeCanvas2 } from "./CompositeCanvas2";

interface Props {}

const DEFAULT_SIZE = 10;
const DEFAULT_BANDS = 40;

export const SolColorBandsCanvasContainer = () => {
  const [size, setSize] = React.useState(DEFAULT_SIZE);
  const [bands, setBands] = React.useState(DEFAULT_BANDS);

  const handleReset = () => {
    setSize(DEFAULT_SIZE);
    setBands(DEFAULT_BANDS);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "bands":
        setBands(val);
        break;
      case "size":
        setSize(val);
        break;
    }
  };

  const canvasSize = 250;

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas
          width={canvasSize}
          height={canvasSize}
          size={size}
          bands={bands}
        />
        <CirclesCanvas
          width={canvasSize}
          height={canvasSize}
          size={size}
          bands={bands}
        />
        <CompositeCanvas1
          width={canvasSize}
          height={canvasSize}
          size={size}
          bands={bands}
        />
        <CompositeCanvas2
          width={canvasSize}
          height={canvasSize}
          size={size}
          bands={bands}
        />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Color Bands"
          artistName="Sol LeWitt"
          year="2000"
          description={() => (
            <>
              <small>
                {/* <a href="https://www.sfmoma.org/artwork/FC.474.2">SF MOMA</a> */}
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="bands"
                  label="Bands"
                  minStepMax={[5, 5, 80]}
                  value={bands}
                  handleChange={handleChange}
                />
                <Slider
                  keyName="size"
                  label="Size"
                  minStepMax={[1, 2, 50]}
                  value={size}
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

export default SolColorBandsCanvasContainer;
