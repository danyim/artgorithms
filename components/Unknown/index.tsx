import React from "react";
import Canvas from "./Canvas";
import CanvasControls from "../CanvasControls";
import { Placard } from "../Placard";

interface Props {}

interface State {
  space: number;
}

export const UnknownCanvasContainer = () => {
  const [space, setSpace] = React.useState(10);
  const handleChange = (key: string, val: number) => {
    setSpace(val);
  };

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <Canvas width={500} height={500} space={space} />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title="Unknown"
          artistName="Unknown"
          description={() => (
            <>
              <small>
                <a href="https://www.sfmoma.org/artwork/FC.474.2">SF MOMA</a>
                ,&nbsp;
                <a href="http://www.ideelart.com/module/csblog/post/177-1-sol-lewitt-wall-drawings.html">
                  IdeelArt
                </a>
              </small>
              <CanvasControls space={space} handleChange={handleChange} />
            </>
          )}
        />
      </div>
    </div>
  );
};
