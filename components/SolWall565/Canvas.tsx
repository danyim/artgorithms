import React from "react";
import ReactDOM from "react-dom";

interface Props {
  width: number;
  height: number;
  lines: number;
  area: number;
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
    this.drawCentoid = this.drawCentoid.bind(this);
    this.drawPolygon = this.drawPolygon.bind(this);
    this.createPolygonWithArea = this.createPolygonWithArea.bind(this);
    this.fillPolygon = this.fillPolygon.bind(this);
    this.fillDot = this.fillDot.bind(this);
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

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const extrapts = () =>
      // Math.floor(2 * Math.random()) + 1;
      1;

    // // Top, right
    // this.createPolygonWithArea([
    //   { x: 200, y: 300 },
    //   { x: 220, y: 300 },
    //   { x: 220, y: 390 },
    // ], extrapts, this.props.area);

    // // Top, left
    // this.createPolygonWithArea([
    //   { x: 200, y: 150 },
    //   { x: 100, y: 150 },
    //   { x: 100, y: 190 },
    // ], extrapts, this.props.area);

    // // Bottom, left
    // this.createPolygonWithArea([
    //   { x: 200, y: 200 },
    //   { x: 200, y: 220 },
    //   { x: 300, y: 220 },
    // ], extrapts, this.props.area);

    // // Bottom, right
    // this.createPolygonWithArea([
    //   { x: 350, y: 200 },
    //   { x: 400, y: 200 },
    //   { x: 400, y: 150 },
    // ], extrapts, this.props.area);

    const verts = [];

    verts.push(
      ...this.createPolygonWithArea(
        [
          { x: 0, y: 50 },
          { x: 0, y: 0 },
          { x: 100, y: 0 },
        ],
        extrapts(),
        this.props.area
      )
    );

    // What I'm trying to do here...
    // Given that we already created the first polygon, P, with 4 sides (3
    // seeded, 1 generated), use the 4 polygons to randomly assign new seeds to
    // N new polygons.
    //
    // The issue is that we can't just randomly choose a side from the previous
    // polygon because when generating the skeleton, we have a general
    // "direction" that we need to grow.

    // debugger;
    // let numPolygonsAdded = verts.length;
    // for (let n = 0; n < 1; n += 1) {
    //   const polygonsToAdd = Math.min(2, Math.floor(Math.random() * numPolygonsAdded) + 1);
    //   const polys = [];
    //   for (let m = 1; m <= polygonsToAdd; m += 1) {
    //     polys.push(verts[verts.length - polygonsToAdd]);
    //   }
    //   verts.push(
    //     ...this.createPolygonWithArea([
    //       ...polys,
    //     ], extrapts(), this.props.area),
    //   );
    // }

    const removeDupes = (arr) => {
      const set = new Set(arr.map((v) => `${v.x},${v.y}`));
      return Array.from(set.values()).map((v) => ({
        x: v.split(",")[0],
        y: v.split(",")[1],
      }));
    };

    const rearrange = (arr) => {
      const newArr = Object.assign([], arr);
      const min = arr.reduce((a, v) => (v.x <= a.x && v.y <= a.y ? v : a), {
        x: Number.MAX_SAFE_INTEGER,
        y: Number.MAX_SAFE_INTEGER,
      });
      const rotate = (a) => a.push(a.shift());

      while (newArr[0].x !== min.x || newArr[0].y !== min.y) {
        rotate(newArr);
      }
      return newArr;
    };

    console.log(
      "Original vertices",
      verts.map((v) => `${v.x},${v.y}`)
    );
    const o = removeDupes(verts);
    console.log(
      "Deduped",
      o.map((v) => `${v.x},${v.y}`)
    );
    const s = o.sort((a, b) =>
      this.comparator.apply(this, [a, b, this.centroidOfPolygon(verts)])
    );
    console.log(
      "Sorted",
      s.map((v) => `${v.x},${v.y}`)
    );
    const r = rearrange(s);
    console.log(
      "Rearranged",
      r.map((v) => `${v.x},${v.y}`)
    );

    // This will draw a perimeter of the greater polygon that encapsulates all
    // the polygons we generated
    this.drawPolygon(r, 3, "pink");

    // TASKS:
    //  [x] Sort a set of points in clockwise order
    //  [x] Find the center of gravity of a polygon, i.e. centoid
    //  [x] Function to calculate the area of a polygon (needs centoid)
    //  [x] Create a polygon with 0..n seed verticies such that it fulfills an area A
    //    [ ] Add this to the global manifest of polygons
    //  [ ] Fill a NxN canvas with N polygons with area ~A (randomized range)
    //  [ ] Fill the a polygon with stripes wrt 2 points in a given bound B
    //  [ ] Keep track of polygons on the canvas via a manifest (or array)

    // console.log('sorting points...');
    // console.log('before', testPolyUnsorted.map(v => `(${v.x}, ${v.y})`));
    // console.log('after', testPolyUnsorted.map(v => `(${v.x}, ${v.y})`));
    // console.log('should be ', testPoly.map(v => `(${v.x}, ${v.y})`));
  }

  // Sort a set of points in clockwise order
  // Comparator for sorting points clockwise
  comparator(a, b, center) {
    // console.log('comparator called with', a, b, center);
    if (a.x - center.x >= 0 && b.x - center.x < 0) {
      return true;
    }
    if (a.x - center.x < 0 && b.x - center.x >= 0) {
      return false;
    }
    if (a.x - center.x == 0 && b.x - center.x === 0) {
      if (a.y - center.y >= 0 || b.y - center.y >= 0) {
        return a.y > b.y;
      }
      return b.y > a.y;
    }

    // compute the cross product of vectors (center -> a) x (center -> b)
    const det =
      (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
    if (det < 0) {
      return true;
    }
    if (det > 0) {
      return false;
    }

    // points a and b are on the same line from the center
    // check which point is closer to the center
    const d1 =
      (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
    const d2 =
      (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
    return d1 > d2;
  }

  // Function to calculate the area of a polygon (needs centoid)
  calculatePolygonArea(vertices) {
    const r = vertices.reduce((acc, v, i) => {
      let curr = v;
      let next = vertices[i + 1];
      if (i === vertices.length - 1) {
        next = vertices[0];
      }
      return acc + (curr.x * next.y - next.x * curr.y);
    }, 0);
    return Math.abs(r) / 2;
  }

  // Draw the center of gravity of a polygon, i.e. centoid
  centroidOfPolygon(vertices) {
    const x = (a, v) => a + v.x;
    const y = (a, v) => a + v.y;
    return {
      x: vertices.reduce(x, 0) / vertices.length,
      y: vertices.reduce(y, 0) / vertices.length,
    };
  }

  fillDot(x, y, size, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }

  drawCentoid(points, color = "blue") {
    const centoid = this.centroidOfPolygon(points);
    this.fillDot(centoid.x, centoid.y, 4, color);
  }

  drawPolygon(vertices, lineWidth = 3, strokeColor = "black") {
    // const sortedVertices = vertices.sort((a, b) =>
    //   this.comparator.apply(this, [a, b, this.centroidOfPolygon(vertices)]));

    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineCap = "round";

    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = strokeColor;
    this.ctx.moveTo(vertices[0].x, vertices[0].y);

    for (let k = 1; k < vertices.length; k += 1) {
      this.ctx.lineTo(vertices[k].x, vertices[k].y);
    }
    this.ctx.closePath();
    // this.ctx.fill();
    this.ctx.stroke();

    // Draw the centoid--remove this later
    this.drawCentoid(vertices);

    // Create a new canvas for our pattern
    // const canvasPattern = ReactDOM.createElement('canvas', { width: 10, height: 10 });
    // const ctxPattern = canvasPattern.getContext('2d');

    // this.addLine(
    //   { x: vertices[vertices.length - 1].x, y: vertices[vertices.length - 1].y },
    //   { x: vertices[0].x, y: vertices[0].y }, null, lineWidth);
  }

  fillPolygon(vertices, lineWidth = 2) {
    for (let k = 0; k < vertices.length - 1; k += 1) {
      this.addLine(
        { x: vertices[k].x, y: vertices[k].y },
        { x: vertices[k + 1].x, y: vertices[k + 1].y },
        null,
        lineWidth
      );
    }
    this.addLine(
      {
        x: vertices[vertices.length - 1].x,
        y: vertices[vertices.length - 1].y,
      },
      { x: vertices[0].x, y: vertices[0].y },
      null,
      lineWidth
    );
  }

  // Create a polygon with 0..n seed verticies such that it fulfills an area A

  /**
   * Creates a polygon that will roughly have the area provided in the args.
   *
   * Currently it will create a new point along the perpendicular of the
   * midpoint of the first and last points, a method which will satisfy growth
   * to area A, but it doesn't look organic/flexible enough for the eye.
   * @param  {Array} vertices             Order matters!
   * @param  {Number} numVerticesToCreate Number of vertices to make
   * @param  {Number} area                Target area
   * @return {Array}                      Array of vertices for the new polygon
   *                                      created.
   */
  createPolygonWithArea(seedVertices, numVerticesToCreate, area) {
    const initialArea = this.calculatePolygonArea(seedVertices);
    // console.log(`inital area is ${initialArea}, target is ${area}`);
    if (initialArea > area) {
      throw new Error(
        "Area provided to createPolygonWithArea cannot be lower than the area of the seed vertices."
      );
    }

    // Sort the vertices
    // let vertices = vertices.sort((a, b) =>
    //   this.comparator.apply(this, [a, b, this.centroidOfPolygon(vertices)]));
    // NOPE, we can't do the above. Instead let's enforce the ordering of
    // vertices passed in.
    const vertices = Object.assign([], seedVertices);
    const newVertices = [];

    console.log("new vertices", vertices);

    // Draw the centoid before the new point
    this.drawCentoid(vertices, "lightblue");

    this.ctx.beginPath();

    // Start filling in the seed vertices
    console.log("drawing initial vertices");
    this.ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let k = 1; k < vertices.length; k += 1) {
      this.ctx.lineTo(vertices[k].x, vertices[k].y);
    }

    let a;
    let b;
    let targetAreaDelta;
    let currentArea;

    for (let v = 1; v <= numVerticesToCreate; v += 1) {
      console.log(`============\nPoint: ${v}\n============`);
      a = vertices[0];
      b = vertices[vertices.length - 1];
      currentArea = this.calculatePolygonArea(vertices);

      // // Draw a line between the first and last vertices
      // this.ctx.moveTo(a.x, a.y);
      // this.ctx.lineTo(b.x, b.y);
      // this.ctx.moveTo(b.x, b.y);

      // console.log(`first pt: (${a.x}, ${a.y}), last pt: (${b.x}, ${b.y})`);
      // console.log(`drawing 'average' of first and last point`);
      this.ctx.fillStyle = "red";
      const midpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const slope = (b.y - a.y) / (b.x - a.x);
      const pslope = slope === 0 ? 0 : -1 * slope ** -1; // Perpendicular slope
      console.log({ slope, pslope });

      // Determine orientation of new point
      const findOrientation = (midVertex, vertices) => {
        const centroid = this.centroidOfPolygon(vertices);
        const add = (m, n) => m + n;
        const sub = (m, n) => m - n;
        // return {
        //   x: midVertex.x >= centroid.x ? add : sub,
        //   y: midVertex.y >= centroid.y ? add : sub,
        // };
        if (midVertex.x >= centroid.x && midVertex.y >= centroid.y) {
          return { x: add, y: add };
        } else if (midVertex.x >= centroid.x && midVertex.y < centroid.y) {
          return { x: add, y: add }; // changed y from sub to add for "bottom left" case
        } else if (midVertex.x < centroid.x && midVertex.y >= centroid.y) {
          return { x: sub, y: sub }; // changed y from add to sub for "top right" case
        } else if (midVertex.x < centroid.x && midVertex.y < centroid.y) {
          return { x: sub, y: sub };
        }
      };
      const orient = findOrientation(midpoint, vertices);
      console.log("orientation:", orient);

      targetAreaDelta = Math.floor(
        Math.random() * ((area - initialArea) / numVerticesToCreate) +
          ((area - initialArea) / numVerticesToCreate) * 0.5
      );
      console.log(`target area delta ${targetAreaDelta}`);

      for (let k = 0; true; k += 5) {
        // TODO: This is assuming we're going to grow southwest
        // Using vector math to find a new point with a slope & initial point
        // http://math.stackexchange.com/a/656525/229495
        const m = pslope;
        const x = Math.floor(orient.x(midpoint.x, k / Math.sqrt(1 + m ** 2)));
        const y = Math.floor(
          orient.y(midpoint.y, (k * m) / Math.sqrt(1 + m ** 2))
        );
        // const x = midpoint.x - (k / Math.sqrt(1 + (slope ** 2)));
        // const y = midpoint.y + (k / Math.sqrt(1 + (slope ** 2)));
        this.fillDot(x, y, 2, "grey");
        // console.log(`drawing (${x}, ${y})`);
        const newArea = Math.floor(
          this.calculatePolygonArea([...vertices, { x, y }])
        );

        // If it's not the last iteration, find a target area between
        if (
          v !== numVerticesToCreate &&
          newArea >= currentArea + targetAreaDelta
        ) {
          console.log(
            `reached target area by adding ${
              newArea - currentArea
            }, target delta was: ${targetAreaDelta}`
          );
          this.ctx.lineTo(x, y);
          vertices.push({ x, y });
          newVertices.push({ x, y });
          console.log(`new point added: (${x}, ${y}); new area is: ${newArea}`);
          break;
        } else if (v === numVerticesToCreate && newArea >= area) {
          // Last iteration; fill in the rest of the area left
          this.ctx.lineTo(x, y);
          vertices.push({ x, y });
          newVertices.push({ x, y });
          console.log(
            `new point: (${x}, ${y}); new polygon area: ${newArea}; delta: ${
              newArea - initialArea
            }`
          );
          break;
        } else if (newArea >= 1000000) {
          console.log("area can't be found");
          break;
        }
      }
    }

    this.ctx.closePath();
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    // this.ctx.fill();

    // Mark the first and last points
    this.fillDot(a.x, a.y, 10, "green");
    this.fillDot(b.x, b.y, 10, "red");

    // Draw the centoid--remove this later
    this.drawCentoid(vertices);

    return vertices;
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
