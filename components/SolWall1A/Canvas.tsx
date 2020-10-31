import React from "react";
import ReactDOM from "react-dom";

interface Props {
  width?: number;
  height?: number;
  lines?: number;
  space: number;
  lineWidth?: number;
  style?: object;
}

class Canvas extends React.Component<Props> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  static defaultProps = {
    width: 500,
    height: 400,
    style: {},
  };

  constructor(props) {
    super(props);

    this.addLine = this.addLine.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.draw = this.draw.bind(this);
    this.drawSol = this.drawSol.bind(this);
    this.drawLinesOnMajorDiagonal = this.drawLinesOnMajorDiagonal.bind(this);
    this.drawLinesOnMinorDiagonal = this.drawLinesOnMinorDiagonal.bind(this);
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

  addLine(start, end, color = "black", width = 1) {
    if (color) this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.drawSol(0, 0, this.props.space, 120, this.props.lineWidth);
  }

  drawSol(
    x: number,
    y: number,
    spacer: number = 10,
    size: number = 120,
    lineWidth: number = null,
    color: string = "black"
  ) {
    // This is the ratio of the horiz/vert sections vs diagonal
    const hRatio = 0.7;
    const vRatio = 0.7;
    const positions = [
      [0, 0],
      [size, 0],
      [size * 2, 0],
      [size * 3, 0],
      [0, size],
      [size, size],
      [size * 2, size],
      [size * 3, size],
      [0, size * 2],
      [size, size * 2],
      [size * 2, size * 2],
      [size * 3, size * 2],
      [0, size * 3],
      [size, size * 3],
      [size * 2, size * 3],
      [size * 3, size * 3],
    ];

    this.ctx.save();
    this.ctx.translate(x, y);
    for (let k = 0; k < positions.length; k += 1) {
      let drawFns = [];
      let space = spacer;
      if (k === 0 || k === 3 || k === 12 || k === 15) {
        drawFns = [this.drawLinesOnMinorDiagonal];
      } else if (k === 1 || k === 2 || k === 13 || k === 14) {
        drawFns = [this.drawLinesOnVertical];
        space *= vRatio;
      } else if (k === 4 || k === 7 || k === 8 || k === 11) {
        drawFns = [this.drawLinesOnMajorDiagonal];
      } else if (k === 5 || k === 6 || k === 9 || k === 10) {
        drawFns = [this.drawLinesOnHorizontal];
        space *= hRatio;
      }
      this.drawLineRectWithFill(
        positions[k][0],
        positions[k][1],
        size,
        size,
        color,
        lineWidth,
        space,
        drawFns
      );
    }
    this.ctx.restore();
  }

  drawLineRectWithFill(
    x: number,
    y: number,
    w: number,
    h: number,
    c: string,
    lineWidth: number,
    spacer: number,
    fillFunctions = []
  ) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.addLine({ x: 0, y: 0 }, { x: w, y: 0 }, c, 2); // Top
    this.addLine({ x: 0, y: 0 }, { x: 0, y: h }, c, 2); // Left
    this.addLine({ x: w, y: 0 }, { x: w, y: h }, c, 2); // Right
    this.addLine({ x: 0, y: h }, { x: w, y: h }, c, 2); // Bottom

    for (let k = 0; k < fillFunctions.length; k++) {
      fillFunctions[k].apply(this, [w, h, spacer, lineWidth]);
    }

    this.ctx.restore();
  }

  drawLinesOnHorizontal(w, h, spacer = 10, lineWidth = null) {
    for (let k = 0; k <= h && k <= w; k += spacer) {
      this.addLine({ x: 0, y: k }, { x: w, y: k }, null, lineWidth);
    }
  }

  drawLinesOnVertical(w, h, spacer = 10, lineWidth = null) {
    for (let k = 0; k <= h && k <= w; k += spacer) {
      this.addLine({ x: k, y: 0 }, { x: k, y: h }, null, lineWidth);
    }
  }

  drawLinesOnMajorDiagonal(w, h, spacer = 10, lineWidth = null) {
    for (let k = 0; k <= h && k <= w; k += spacer) {
      this.addLine({ x: k, y: 0 }, { x: w, y: h - k }, null, lineWidth);
    }
    for (let k = spacer; k <= h && k <= w; k += spacer) {
      this.addLine({ x: 0, y: k }, { x: w - k, y: h }, null, lineWidth);
    }
  }

  drawLinesOnMinorDiagonal(w, h, spacer = 10, lineWidth = null) {
    for (let k = 0; k <= h && k <= w; k += spacer) {
      this.addLine({ x: k, y: 0 }, { x: 0, y: k }, null, lineWidth);
    }
    for (let k = spacer; k <= h && k <= w; k += spacer) {
      this.addLine({ x: k, y: h }, { x: h, y: k }, null, lineWidth);
    }
  }

  render() {
    return (
      <canvas
        id="mainCanvas"
        width={this.props.width}
        height={this.props.height}
        style={this.props.style}
      />
    );
  }
}

export default Canvas;
