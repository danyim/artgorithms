import React from "react";
import Canvas from "./Canvas";
import CirclesCanvas from "./CirclesCanvas";
import { CompositeCanvas1 } from "./CompositeCanvas1";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";
import { CompositeCanvas2 } from "./CompositeCanvas2";

interface Props {}

export const SolColorBandsCanvasContainer = () => {
  const [size, setSize] = React.useState(10);
  const [bands, setBands] = React.useState(40);

  const handleReset = () => {
    setSize(10);
    setBands(40);
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

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={250} height={250} size={size} bands={bands} />
        <CirclesCanvas width={250} height={250} size={size} bands={bands} />
        <CompositeCanvas1 width={250} height={250} size={size} bands={bands} />
        <CompositeCanvas2 width={250} height={250} size={size} bands={bands} />
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
