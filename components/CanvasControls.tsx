import React from "react";

interface Props {
  lines?: number;
  lineWidth?: number;
  rotation?: number;
  sections?: number;
  space?: number;
  area?: number;
  color?: number;
  handleChange: (key: string, val: number) => void;
}

class CanvasControls extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);
    this.renderControl = this.renderControl.bind(this);
  }

  onInput(e, prop: string) {
    this.props.handleChange(prop, parseInt(e.target.value, 10));
  }

  renderControl(key: string, label: string, min = 0, max = 100, step = 5) {
    return (
      <p>
        <label htmlFor={key}>
          {label} ({this.props[key]})
        </label>
        <input
          name={key}
          className="mdl-slider"
          type="range"
          defaultValue={this.props[key]}
          min={min}
          max={max}
          step={step}
          onInput={(e) => this.onInput(e, key)}
        />
      </p>
    );
  }
  render() {
    return (
      <div>
        {this.props.color
          ? this.renderControl("color", "Colors", 5, 100, 5)
          : null}
        {this.props.space
          ? this.renderControl("space", "Spacing", 5, 50, 5)
          : null}
        {this.props.lineWidth
          ? this.renderControl("lineWidth", "Line Width", 1, 10, 1)
          : null}
        {this.props.lines ? this.renderControl("lines", "Lines") : null}
        {this.props.rotation
          ? this.renderControl("rotation", "Rotation")
          : null}
        {this.props.sections
          ? this.renderControl("sections", "Sections")
          : null}
        {this.props.area
          ? this.renderControl("area", "Area", 2500, 10000, 200)
          : null}
      </div>
    );
  }
}

export default CanvasControls;
