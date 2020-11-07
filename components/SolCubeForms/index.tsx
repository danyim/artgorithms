import React from "react";
import Canvas from "./Canvas";
import { Placard } from "../Placard";
import CanvasInputs from "../CanvasInputs";
import Slider from "../Slider";

interface Props {
  width?: number;
  height?: number;
}

export const SolCubeFormsCanvasContainer = ({
  width = 500,
  height = 500,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>();
  const [space, setSpace] = React.useState(10);

  const handleReset = () => {
    setSpace(10);
  };

  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };
  let mouseOut;

  const handleOnMouseMove = (e) => {
    if (mouseOut) {
      clearTimeout(mouseOut);
    }
    if (containerRef.current) {
      const boundingBox = containerRef.current.getBoundingClientRect();
      const clientXCanvas =
        Math.max(e.clientX - boundingBox.left, 0) / boundingBox.width;
      const clientYCanvas =
        Math.max(e.clientY - boundingBox.top, 0) / boundingBox.height;
      setSpace(Math.floor(clientYCanvas * 50));
    }
  };

  const handleOnMouseOut = (e) => {
    mouseOut = setTimeout(() => {
      setSpace(10);
    }, 1500);
  };

  return (
    <div className="mdl-grid">
      <div ref={containerRef} className="mdl-cell mdl-cell--8-col">
        <Canvas
          width={width}
          height={height}
          space={space}
          onMouseMove={handleOnMouseMove}
          onMouseOut={handleOnMouseOut}
        />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="
          Forms Derived from a Cube in Color"
          artistName="Sol LeWitt"
          description={() => (
            <>
              <small>
                <a href="https://www.sfmoma.org/artwork/FC.317.1-6/">SF MOMA</a>
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
