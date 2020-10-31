import React from "react";
import ReactDOM from "react-dom";
import { randomHueColor } from "../../utils/color";

interface Props {
  width: number;
  height: number;
  space: number;
}

class Canvas extends React.Component<Props> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  static defaultProps = {
    width: 500,
    height: 400,
  };

  constructor(props: Props) {
    super(props);

    this.clearCanvas = this.clearCanvas.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this); // eslint-disable-line
    this.ctx = this.canvas.getContext("2d");

    this.draw();
  }

  componentWillUpdate() {
    this.clearCanvas();
    this.draw();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    const width = 55;
    const height = 22;
    const vspace = this.props.space; // 8
    const hspace = this.props.space; // 8
    const voffset = 10;
    const hoffset = 10;

    // Draws it out with the given width (not working. draws more than necessary)
    /* for (let k = voffset; k <= h; k += height + vspace) {
      for (let n = hoffset; n <= w; n += width + hspace) {
        this.fillRect(n, k, width, height, 0, null, randomHexColor())
      }
    } */
    for (let k = 0; k < 16; k += 1) {
      for (let n = 0; n < 16; n += 1) {
        this.fillRect(
          n * width + n * hspace + hoffset,
          k * height + k * vspace + voffset,
          width,
          height,
          0,
          null,
          randomHueColor({ max: 75, min: 15 }, { max: 75, min: 15 })
        );
      }
    }
  }

  fillRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    lineWidth: number,
    stokeColor: string = "",
    fillColor: string = ""
  ) => {
    this.ctx.save();
    this.ctx.translate(x, y);

    if (fillColor) this.ctx.fillStyle = fillColor;
    if (stokeColor) this.ctx.strokeStyle = stokeColor;
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.restore();
  };

  fillRectWithLines = (
    x: number,
    y: number,
    w: number,
    h: number,
    lineWidth: number,
    stokeColor: string = "",
    fillColor: string = ""
  ) => {
    this.ctx.save();
    this.ctx.translate(x, y);

    this.ctx.beginPath();

    if (fillColor) this.ctx.fillStyle = fillColor;
    if (stokeColor) this.ctx.strokeStyle = stokeColor;
    this.ctx.lineWidth = lineWidth;

    // Top
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(w, 0);
    // Right
    this.ctx.moveTo(w, 0);
    this.ctx.lineTo(w, h);
    // Bottom
    this.ctx.moveTo(0, h);
    this.ctx.lineTo(w, h);
    // Left
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, h);

    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore();
  };

  render() {
    const { width, height } = this.props;
    return <canvas id="mainCanvas" width={width} height={height} />;
  }
}

export default Canvas;
