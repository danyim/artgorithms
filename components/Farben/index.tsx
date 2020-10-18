import React from "react";
import Canvas from "./Canvas";
import CanvasControls from "../CanvasControls";

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
      // lines: 1,
      // rotation: 0,
      // sections: 4,
      space: 10,
      // area: 2500
      color: 10,
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
        <div className="mdl-cell mdl-cell--4-col" />
        <div className="mdl-cell mdl-cell--4-col">
          <h4>256 Farben (1974/1984)</h4>
          <p>by Gerhard Richter</p>
          <p>
            <a href="https://www.sfmoma.org/artwork/FC.643">SF MOMA</a>
          </p>

          <CanvasControls {...this.state} handleChange={this.handleChange} />
        </div>
        <div className="mdl-cell mdl-cell--4-col" />
      </div>
    );
  }
}

export default Farben;
