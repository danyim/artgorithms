import React from "react";
import Canvas from "./Canvas";
import CanvasControls from "../CanvasControls";
import { Placard } from "../Placard";

interface Props {
  width?: number;
  height?: number;
}

export const SolCubeFormsCanvasContainer = ({
  width = 500,
  height = 500,
}: Props) => {
  const [space, setSpace] = React.useState(10);
  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={width} height={height} space={space} />
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
              <CanvasControls space={space} handleChange={handleChange} />
            </>
          )}
        />
      </div>
    </div>
  );
};
