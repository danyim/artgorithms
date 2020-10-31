import React from "react";
import Canvas from "./Canvas";
import CanvasControls from "../CanvasControls";
import { Placard } from "../Placard";

interface Props {}

interface State {
  space: number;
}

class CanvasContainer extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // Comment out the controllers you wish to hide here and the UI will update
    // accordingly
    this.state = {
      // lines: 1,
      // lineWidth: 2, // Doesn't look good so taking this out
      // rotation: 0,
      // sections: 4,
      space: 10,
    };
  }

  handleChange(key: string, val: number) {
    this.setState({
      [key]: val,
    });
  }

  render() {
    const { space } = this.state;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col">
          <Canvas width={500} height={500} space={space} lineWidth={2} />
        </div>
        <div className="mdl-cell mdl-cell--4-col">
          <Placard
            title="Wall Drawing 1: Drawing Series II 18 A (1968)"
            artistName="Sol LeWitt"
            description={() => (
              <>
                <small>
                  <a href="https://www.sfmoma.org/artwork/FC.474.2">SF MOMA</a>
                  ,&nbsp;
                  <a href="http://www.ideelart.com/module/csblog/post/177-1-sol-lewitt-wall-drawings.html">
                    IdeelArt
                  </a>
                </small>
                <CanvasControls
                  {...this.state}
                  handleChange={this.handleChange}
                />
              </>
            )}
          />
        </div>
      </div>
    );
  }
}

export default CanvasContainer;
