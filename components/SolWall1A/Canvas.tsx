import React from "react";
import ReactDOM from "react-dom";

interface Props {
  width: number;
  height: number;
  lines: number;
  lineWidth: number;
  style: object;
}

class Canvas extends React.Component<Props> {
  static defaultProps = {
    width: 500,
    height: 400,
    style: {},
  };

  static vector(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y,
    };
  }

  static dot(u, v) {
    return u.x * v.x + u.y * v.y;
  }

  static pointInRectangle(m, r) {
    const AB = this.vector(r.A, r.B);
    const AM = this.vector(r.A, m);
    const BC = this.vector(r.B, r.C);
    const BM = this.vector(r.B, m);
    const dotABAM = this.dot(AB, AM);
    const dotABAB = this.dot(AB, AB);
    const dotBCBM = this.dot(BC, BM);
    const dotBCBC = this.dot(BC, BC);
    return (
      dotABAM >= 0 && dotABAM <= dotABAB && dotBCBM >= 0 && dotBCBM <= dotBCBC
    );
  }

  constructor(props) {
    super(props);

    this.addLine = this.addLine.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.draw = this.draw.bind(this);
    this.drawSol = this.drawSol.bind(this);
    this.drawLineRect = this.drawLineRect.bind(this);
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
    const w = this.canvas.width;
    const h = this.canvas.height;

    const randPt = () => {
      return { x: Math.random() * w, y: Math.random() * h };
    };

    const randPtInBounds = (bounds) => {
      let r;
      while (true) {
        r = randPt();
        if (!this.constructor.pointInRectangle(r, bounds)) return r;
      }
      // return { x: Math.random() * w, y: Math.random() * h };
    };

    const randColor = (noAlpha = false) => {
      const r = () => Math.floor(Math.random() * 255);
      return `rgba(${r()}, ${r()}, ${r()}, ${
        noAlpha ? 1.0 : parseFloat(Math.random().toFixed(2))
      })`;
    };
    const randGrey = (noAlpha = false) => {
      const r = 255 - (Math.floor(Math.random() * 255) + 35);
      return `rgba(${r}, ${r}, ${r}, ${
        noAlpha ? 1.0 : parseFloat(Math.random().toFixed(2))
      })`;
    };

    // for (let k = 0; k < this.props.lines; k++) {
    //   this.addLine(randPt(), randPt(), randColor(), 2);
    // }

    // Draws a diagonal
    const xToYAxis = (canvasWidth, canvasHeight) => {
      const spacer = 10;
      let linesDrawn = 0;
      for (
        let k = 0;
        k <= canvasHeight && k <= canvasWidth && linesDrawn < this.props.lines;
        k += spacer
      ) {
        this.addLine({ x: k, y: 0 }, { x: 0, y: k }, null, 2);
        linesDrawn += 1;
      }
      for (
        let k = spacer;
        k <= canvasHeight && k <= canvasWidth && linesDrawn < this.props.lines;
        k += spacer
      ) {
        this.addLine(
          { x: k, y: canvasHeight },
          { x: canvasHeight, y: k },
          null,
          2
        );
        linesDrawn += 1;
      }
    };

    // Draw a bound
    // this.ctx.fillStyle = 'green';
    // this.ctx.fillRect(10, 10, 100, 100);
    // const rect = this.drawLineRect(50, 50, 100, 100);
    // console.log('false?', this.constructor.pointInRectangle({ x: 0, y: 0 }, rect));
    // console.log('true?', this.constructor.pointInRectangle({ x: 75, y: 75 }, rect));

    this.drawSol(0, 0, this.props.space, 120, this.props.lineWidth);

    // Try to fill that bound with lines
    // xToYAxis(w, h);
  }

  drawSol(x, y, spacer = 10, size = 120, lineWidth = null, color = "black") {
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

  /**
   * Draws a bordered rectangle
   * @param  {Number} x         x coord for top left point
   * @param  {Number} y         y coord for top left point
   * @param  {Number} w         Width of the rectangle
   * @param  {Number} h         Height
   * @param  {String} c         Color
   * @param  {Number} lineWidth 1-n line width
   * @return {RectangleBounds}           Returns points A, B, C, D that were created
   * for the rectangle
   */
  drawLineRect(x, y, w, h, c, lineWidth) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.addLine({ x: 0, y: 0 }, { x: w, y: 0 }, c, lineWidth); // Top
    this.addLine({ x: 0, y: 0 }, { x: 0, y: h }, c, lineWidth); // Left
    this.addLine({ x: w, y: 0 }, { x: w, y: h }, c, lineWidth); // Right
    this.addLine({ x: 0, y: h }, { x: w, y: h }, c, lineWidth); // Bottom
    this.ctx.restore();
    return {
      A: { x, y },
      B: { x: x + w, y },
      C: { x: x + w, y: y + h },
      D: { x, y: y + h },
    };
  }

  drawLineRectWithFill(x, y, w, h, c, lineWidth, spacer, fillFunctions = []) {
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
