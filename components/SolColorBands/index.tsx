import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

export const SolColorBandsCanvasContainer = () => {
  const [size, setSize] = React.useState(10);
  const [bands, setBands] = React.useState(40);
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
        <Canvas width={500} height={500} size={size} bands={bands} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Color Bands"
          artistName="Sol LeWitt"
          description={() => (
            <>
              <small>
                {/* <a href="https://www.sfmoma.org/artwork/FC.474.2">SF MOMA</a> */}
              </small>
              <CanvasInputs>
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
