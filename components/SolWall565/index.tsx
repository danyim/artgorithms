import React from "react";
import Canvas from "./Canvas";
import CanvasControls from "../CanvasControls";

interface Props {
  width: number;
  height: number;
}

class CanvasContainer extends React.Component<Props> {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // Comment out the controllers you wish to hide here and the UI will update
    // accordingly
    this.state = {
      // lines: 1,
      // rotation: 0,
      // sections: 4,
      // space: 10,
      area: 2500,
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
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col">
          <Canvas
            width={this.props.width}
            height={this.props.height}
            {...this.state}
          />
        </div>
        <div className="mdl-cell mdl-cell--4-col">
          <h4>Wall Drawing 565 (1988)</h4>
          <p>by Sol LeWitt</p>
          <h5>(WORK IN PROGRESS)</h5>
          <p>
            <a href="https://www.sfmoma.org/artwork/2000.440">SF MOMA</a>
          </p>

          <CanvasControls {...this.state} handleChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default CanvasContainer;
