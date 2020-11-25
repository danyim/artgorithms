import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {}

export const SolWall1111CanvasContainer = () => {
  const [bands, setBands] = React.useState(15);
  const [size, setSize] = React.useState(10);

  const handleReset = () => {
    setBands(15);
    setSize(10);
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
        <Canvas width={500} height={500} bands={bands} size={size} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Wall Drawing #1111: Circle with Broken Bands of Color"
          artistName="Sol LeWitt"
          year="2003"
          description={() => (
            <>
              <small>
                <a href="https://www.sothebys.com/en/auctions/ecatalogue/2018/contemporary-curated-n09824/lot.38.html">
                  Sotheby's
                </a>
              </small>
              <CanvasInputs onReset={handleReset}>
                <Slider
                  keyName="size"
                  label="Size"
                  minStepMax={[10, 10, 100]}
                  value={size}
                  handleChange={handleChange}
                />
                <Slider
                  keyName="bands"
                  label="Bands"
                  minStepMax={[10, 5, 35]}
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
