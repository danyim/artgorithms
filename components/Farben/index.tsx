import React from "react";
import Canvas from "./Canvas";
import CanvasControls from "../CanvasControls";
import { Placard } from "../Placard";

interface Props {
  width: number;
  height: number;
}

class Farben extends React.Component<Props> {
  static defaultProps = {
    width: 1050,
    height: 525,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // Comment out the controllers you wish to hide here and the UI will update
    // accordingly
    this.state = {
      space: 5,
    };
  }

  handleChange(prop, val) {
    this.setState({
      ...this.state,
      [`${prop}`]: val,
    });
  }

  render() {
    return (
      <div>
        <div className="mdl-cell mdl-cell--12-col">
          <Canvas
            width={this.props.width}
            height={this.props.height}
            {...this.state}
          />
        </div>
        <div className="mdl-cell mdl-cell--4-col">
          <Placard
            title="256 Farben (1974/1984)"
            artistName="Gerhard Richter"
            description={() => (
              <>
                <small>
                  <a href="https://www.sfmoma.org/artwork/FC.643">SF MOMA</a>
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

export default Farben;
