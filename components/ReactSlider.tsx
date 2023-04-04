import React from "react";

interface Props {
  min: number;
  max: number;
  step: number;
  pageFn: (number) => number;
  minDistance: number;
  defaultValue: number | number[];
  value: number | number[];
  orientation: "horizontal" | "vertical";
  className: string;
  thumbClassName: string;
  thumbActiveClassName: string;
  trackClassName: string;
  markClassName: string;
  withTracks: boolean;
  pearling: boolean;
  disabled: boolean;
  snapDragDisabled: boolean;
  invert: boolean;
  marks: boolean | number | number[];
  renderThumb: React.FC;
  renderTrack: React.FC;
  renderMark: React.FC;
  onBeforeChange: () => void;
  onChange: () => void;
  onSliderClick: (number) => void;
  ariaLabel?: string | string[];
  ariaLabelledby?: string | string[];
  ariaValuetext?:
    | string
    | ((s: { index: number; value: number; valueNow: number }) => void);
}

interface State {
  index: number;
  upperBound: number;
  sliderLength: number;
  value: number[];
  zIndices: number[];
  pending?: boolean;
  startPosition?: number;
  startValue?: number;
  thumbSize?: number;
}

/**
 * To prevent text selection while dragging.
 * http://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag
 */
function pauseEvent(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function stopPropagation(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
}

function sanitizeInValue(x) {
  if (x == null) {
    return [];
  }
  return Array.isArray(x) ? x.slice() : [x];
}

function prepareOutValue(x) {
  return x !== null && x.length === 1 ? x[0] : x.slice();
}

function trimSucceeding(length, nextValue, minDistance, max) {
  for (let i = 0; i < length; i += 1) {
    const padding = max - i * minDistance;
    if (nextValue[length - 1 - i] > padding) {
      // eslint-disable-next-line no-param-reassign
      nextValue[length - 1 - i] = padding;
    }
  }
}

function trimPreceding(length, nextValue, minDistance, min) {
  for (let i = 0; i < length; i += 1) {
    const padding = min + i * minDistance;
    if (nextValue[i] < padding) {
      // eslint-disable-next-line no-param-reassign
      nextValue[i] = padding;
    }
  }
}

function addHandlers(eventMap) {
  Object.keys(eventMap).forEach((key) => {
    if (typeof document !== "undefined") {
      document.addEventListener(key, eventMap[key], false);
    }
  });
}

function removeHandlers(eventMap) {
  Object.keys(eventMap).forEach((key) => {
    if (typeof document !== "undefined") {
      document.removeEventListener(key, eventMap[key], false);
    }
  });
}

function trimAlignValue(val, props) {
  return alignValue(trimValue(val, props), props);
}

function alignValue(val, props) {
  const valModStep = (val - props.min) % props.step;
  let alignedValue = val - valModStep;

  if (Math.abs(valModStep) * 2 >= props.step) {
    alignedValue += valModStep > 0 ? props.step : -props.step;
  }

  return parseFloat(alignedValue.toFixed(5));
}

function trimValue(val, props) {
  let trimmed = val;
  if (trimmed <= props.min) {
    trimmed = props.min;
  }
  if (trimmed >= props.max) {
    trimmed = props.max;
  }

  return trimmed;
}

class ReactSlider extends React.Component<Props, State> {
  static displayName = "ReactSlider";

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    pageFn: (step) => step * 10,
    minDistance: 0,
    defaultValue: 0,
    orientation: "horizontal",
    className: "slider",
    thumbClassName: "thumb",
    thumbActiveClassName: "active",
    trackClassName: "track",
    markClassName: "mark",
    withTracks: true,
    pearling: false,
    disabled: false,
    snapDragDisabled: false,
    invert: false,
    marks: [],
    renderThumb: (props) => <div {...props} />,
    renderTrack: (props) => <div {...props} />,
    renderMark: (props) => <span {...props} />,
  };

  resizeObserver: ResizeObserver | null;
  pendingResizeTimeouts: number[];
  resizeElementRef;
  isScrolling?: boolean;
  hasMoved: boolean;
  startPosition: number[];
  value: number[];
  slider;
  thumb0;

  constructor(props) {
    super(props);

    let value = sanitizeInValue(props.value);
    if (!value.length) {
      value = sanitizeInValue(props.defaultValue);
    }

    // array for storing resize timeouts ids
    this.pendingResizeTimeouts = [];

    const zIndices = [];
    for (let i = 0; i < value.length; i += 1) {
      value[i] = trimAlignValue(value[i], props);
      zIndices.push(i);
    }

    this.resizeObserver = null;
    this.resizeElementRef = React.createRef();

    this.state = {
      index: -1,
      upperBound: 0,
      sliderLength: 0,
      value,
      zIndices,
    };
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.resizeElementRef.current);
      this.resize();
    }
  }

  // Keep the internal `value` consistent with an outside `value` if present.
  // This basically allows the slider to be a controlled component.
  static getDerivedStateFromProps(props, state) {
    const value = sanitizeInValue(props.value);
    if (!value.length) {
      return null;
    }

    // Do not allow controlled upates to happen while we have pending updates
    if (state.pending) {
      return null;
    }

    return {
      value: value.map((item) => trimAlignValue(item, props)),
    };
  }

  componentDidUpdate() {
    // If an upperBound has not yet been determined (due to the component being hidden
    // during the mount event, or during the last resize), then calculate it now
    if (this.state.upperBound === 0) {
      this.resize();
    }
  }

  componentWillUnmount() {
    this.clearPendingResizeTimeouts();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  onKeyUp = () => {
    this.onEnd();
  };

  onMouseUp = () => {
    this.onEnd(this.getMouseEventMap());
  };

  onTouchEnd = () => {
    this.onEnd(this.getTouchEventMap());
  };

  onBlur = () => {
    this.setState({ index: -1 }, () => {
      this.onEnd(this.getKeyDownEventMap());
    });
  };

  onEnd(eventMap?: any) {
    if (eventMap) {
      removeHandlers(eventMap);
    }
    if (this.hasMoved) {
      this.fireChangeEvent("onAfterChange");
    }

    // Allow controlled updates to continue
    this.setState({ pending: false });

    this.hasMoved = false;
  }

  onMouseMove = (e) => {
    // Prevent controlled updates from happening while mouse is moving
    this.setState({ pending: true });

    const position = this.getMousePosition(e);
    const diffPosition = this.getDiffPosition(position[0]);
    const newValue = this.getValueFromPosition(diffPosition);
    this.move(newValue);
  };

  onTouchMove = (e) => {
    if (e.touches.length > 1) {
      return;
    }

    // Prevent controlled updates from happending while touch is moving
    this.setState({ pending: true });

    const position = this.getTouchPosition(e);

    if (typeof this.isScrolling === "undefined") {
      const diffMainDir = position[0] - this.startPosition[0];
      const diffScrollDir = position[1] - this.startPosition[1];
      this.isScrolling = Math.abs(diffScrollDir) > Math.abs(diffMainDir);
    }

    if (this.isScrolling) {
      this.setState({ index: -1 });
      return;
    }

    const diffPosition = this.getDiffPosition(position[0]);
    const newValue = this.getValueFromPosition(diffPosition);

    this.move(newValue);
  };

  onKeyDown = (e) => {
    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
      return;
    }

    // Prevent controlled updates from happening while a key is pressed
    this.setState({ pending: true });

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
      case "Left":
      case "Down":
        e.preventDefault();
        this.moveDownByStep();
        break;
      case "ArrowRight":
      case "ArrowUp":
      case "Right":
      case "Up":
        e.preventDefault();
        this.moveUpByStep();
        break;
      case "Home":
        e.preventDefault();
        this.move(this.props.min);
        break;
      case "End":
        e.preventDefault();
        this.move(this.props.max);
        break;
      case "PageDown":
        e.preventDefault();
        this.moveDownByStep(this.props.pageFn(this.props.step));
        break;
      case "PageUp":
        e.preventDefault();
        this.moveUpByStep(this.props.pageFn(this.props.step));
        break;
      default:
    }
  };

  onSliderMouseDown = (e) => {
    // do nothing if disabled or right click
    if (this.props.disabled || e.button === 2) {
      return;
    }

    // Prevent controlled updates from happening while mouse is moving
    this.setState({ pending: true });

    if (!this.props.snapDragDisabled) {
      const position = this.getMousePosition(e);
      this.forceValueFromPosition(position[0], (i) => {
        this.start(i, position[0]);
        addHandlers(this.getMouseEventMap());
      });
    }

    pauseEvent(e);
  };

  onSliderClick = (e) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onSliderClick && !this.hasMoved) {
      const position = this.getMousePosition(e);
      const valueAtPos = trimAlignValue(
        this.calcValue(this.calcOffsetFromPosition(position[0])),
        this.props
      );
      this.props.onSliderClick(valueAtPos);
    }
  };

  getValue() {
    return prepareOutValue(this.state.value);
  }

  getClosestIndex(pixelOffset) {
    let minDist = Number.MAX_VALUE;
    let closestIndex = -1;

    const { value } = this.state;
    const l = value.length;

    for (let i = 0; i < l; i += 1) {
      const offset = this.calcOffset(value[i]);
      const dist = Math.abs(pixelOffset - offset);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  getMousePosition(e) {
    return [e[`page${this.axisKey()}`], e[`page${this.orthogonalAxisKey()}`]];
  }

  getTouchPosition(e) {
    const touch = e.touches[0];
    return [
      touch[`page${this.axisKey()}`],
      touch[`page${this.orthogonalAxisKey()}`],
    ];
  }

  getKeyDownEventMap() {
    return {
      keydown: this.onKeyDown,
      keyup: this.onKeyUp,
      focusout: this.onBlur,
    };
  }

  getMouseEventMap() {
    return {
      mousemove: this.onMouseMove,
      mouseup: this.onMouseUp,
    };
  }

  getTouchEventMap() {
    return {
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd,
    };
  }

  getValueFromPosition(position) {
    const diffValue =
      (position / (this.state.sliderLength - this.state.thumbSize)) *
      (this.props.max - this.props.min);
    return trimAlignValue(this.state.startValue + diffValue, this.props);
  }

  getDiffPosition(position) {
    let diffPosition = position - this.state.startPosition;
    if (this.props.invert) {
      diffPosition *= -1;
    }
    return diffPosition;
  }

  // create the `keydown` handler for the i-th thumb
  createOnKeyDown = (i) => (e) => {
    if (this.props.disabled) {
      return;
    }
    this.start(i);
    addHandlers(this.getKeyDownEventMap());
    pauseEvent(e);
  };

  // create the `mousedown` handler for the i-th thumb
  createOnMouseDown = (i) => (e) => {
    // do nothing if disabled or right click
    if (this.props.disabled || e.button === 2) {
      return;
    }

    // Prevent controlled updates from happending while mouse is moving
    this.setState({ pending: true });

    const position = this.getMousePosition(e);
    this.start(i, position[0]);
    addHandlers(this.getMouseEventMap());
    pauseEvent(e);
  };

  // create the `touchstart` handler for the i-th thumb
  createOnTouchStart = (i) => (e) => {
    if (this.props.disabled || e.touches.length > 1) {
      return;
    }

    // Prevent controlled updates from happending while touch is moving
    this.setState({ pending: true });

    const position = this.getTouchPosition(e);
    this.startPosition = position;
    // don't know yet if the user is trying to scroll
    this.isScrolling = undefined;
    this.start(i, position[0]);
    addHandlers(this.getTouchEventMap());
    stopPropagation(e);
  };

  handleResize = () => {
    // setTimeout of 0 gives element enough time to have assumed its new size if
    // it is being resized
    const resizeTimeout = window.setTimeout(() => {
      // drop this timeout from pendingResizeTimeouts to reduce memory usage
      this.pendingResizeTimeouts.shift();
      this.resize();
    }, 0);

    this.pendingResizeTimeouts.push(resizeTimeout);
  };

  resize() {
    const { slider, thumb0: thumb } = this;
    if (!slider || !thumb) {
      return;
    }

    const sizeKey = this.sizeKey();

    // For the slider size, we want to use the client width/height, excluding any borders
    const sliderRect = slider.getBoundingClientRect();
    const sliderSize = slider[sizeKey];
    const sliderMax = sliderRect[this.posMaxKey()];
    const sliderMin = sliderRect[this.posMinKey()];

    // For the thumb size, we want to use the outer width/height, including any borders
    const thumbRect = thumb.getBoundingClientRect();
    const thumbSize = thumbRect[sizeKey.replace("client", "").toLowerCase()];

    const upperBound = sliderSize - thumbSize;
    const sliderLength = Math.abs(sliderMax - sliderMin);

    if (
      this.state.upperBound !== upperBound ||
      this.state.sliderLength !== sliderLength ||
      this.state.thumbSize !== thumbSize
    ) {
      this.setState({
        upperBound,
        sliderLength,
        thumbSize,
      });
    }
  }

  // calculates the offset of a thumb in pixels based on its value.
  calcOffset(value) {
    const range = this.props.max - this.props.min;
    if (range === 0) {
      return 0;
    }
    const ratio = (value - this.props.min) / range;
    return ratio * this.state.upperBound;
  }

  // calculates the value corresponding to a given pixel offset, i.e. the inverse of `calcOffset`.
  calcValue(offset) {
    const ratio = offset / this.state.upperBound;
    return ratio * (this.props.max - this.props.min) + this.props.min;
  }

  calcOffsetFromPosition(position) {
    const { slider } = this;

    const sliderRect = slider.getBoundingClientRect();
    const sliderMax = sliderRect[this.posMaxKey()];
    const sliderMin = sliderRect[this.posMinKey()];

    // The `position` value passed in is the mouse position based on the window height.
    // The slider bounding rect is based on the viewport, so we must add the window scroll
    // offset to normalize the values.
    const windowOffset = window[`page${this.axisKey()}Offset`];
    const sliderStart =
      windowOffset + (this.props.invert ? sliderMax : sliderMin);

    let pixelOffset = position - sliderStart;
    if (this.props.invert) {
      pixelOffset = this.state.sliderLength - pixelOffset;
    }
    pixelOffset -= this.state.thumbSize / 2;
    return pixelOffset;
  }

  // Snaps the nearest thumb to the value corresponding to `position`
  // and calls `callback` with that thumb's index.
  forceValueFromPosition(position, callback) {
    const pixelOffset = this.calcOffsetFromPosition(position);
    const closestIndex = this.getClosestIndex(pixelOffset);
    const nextValue = trimAlignValue(this.calcValue(pixelOffset), this.props);

    // Clone this.state.value since we'll modify it temporarily
    // eslint-disable-next-line zillow/react/no-access-state-in-setstate
    const value = this.state.value.slice();
    value[closestIndex] = nextValue;

    // Prevents the slider from shrinking below `props.minDistance`
    for (let i = 0; i < value.length - 1; i += 1) {
      if (value[i + 1] - value[i] < this.props.minDistance) {
        return;
      }
    }

    this.fireChangeEvent("onBeforeChange");
    this.hasMoved = true;
    this.setState({ value }, () => {
      callback(closestIndex);
      this.fireChangeEvent("onChange");
    });
  }

  // clear all pending timeouts to avoid error messages after unmounting
  clearPendingResizeTimeouts() {
    do {
      const nextTimeout = this.pendingResizeTimeouts.shift();

      clearTimeout(nextTimeout);
    } while (this.pendingResizeTimeouts.length);
  }

  start(i, position?: number) {
    const thumbRef = this[`thumb${i}`];
    if (thumbRef) {
      thumbRef.focus();
    }

    const { zIndices } = this.state;
    // remove wherever the element is
    zIndices.splice(zIndices.indexOf(i), 1);
    // add to end
    zIndices.push(i);

    this.setState((prevState) => ({
      startValue: prevState.value[i],
      startPosition:
        position !== undefined ? position : prevState.startPosition,
      index: i,
      zIndices,
    }));
  }

  moveUpByStep(step = this.props.step) {
    const oldValue = this.state.value[this.state.index];
    const newValue = trimAlignValue(oldValue + step, this.props);
    this.move(Math.min(newValue, this.props.max));
  }

  moveDownByStep(step = this.props.step) {
    const oldValue = this.state.value[this.state.index];
    const newValue = trimAlignValue(oldValue - step, this.props);
    this.move(Math.max(newValue, this.props.min));
  }

  move(newValue) {
    const { index, value } = this.state;
    const { length } = value;

    // Short circuit if the value is not changing
    const oldValue = value[index];
    if (newValue === oldValue) {
      return;
    }

    // Trigger only before the first movement
    if (!this.hasMoved) {
      this.fireChangeEvent("onBeforeChange");
    }
    this.hasMoved = true;

    // if "pearling" (= thumbs pushing each other) is disabled,
    // prevent the thumb from getting closer than `minDistance` to the previous or next thumb.
    const { pearling, max, min, minDistance } = this.props;
    if (!pearling) {
      if (index > 0) {
        const valueBefore = value[index - 1];
        if (newValue < valueBefore + minDistance) {
          // eslint-disable-next-line no-param-reassign
          newValue = valueBefore + minDistance;
        }
      }

      if (index < length - 1) {
        const valueAfter = value[index + 1];
        if (newValue > valueAfter - minDistance) {
          // eslint-disable-next-line no-param-reassign
          newValue = valueAfter - minDistance;
        }
      }
    }

    value[index] = newValue;

    // if "pearling" is enabled, let the current thumb push the pre- and succeeding thumbs.
    if (pearling && length > 1) {
      if (newValue > oldValue) {
        this.pushSucceeding(value, minDistance, index);
        trimSucceeding(length, value, minDistance, max);
      } else if (newValue < oldValue) {
        this.pushPreceding(value, minDistance, index);
        trimPreceding(length, value, minDistance, min);
      }
    }

    // Normally you would use `shouldComponentUpdate`,
    // but since the slider is a low-level component,
    // the extra complexity might be worth the extra performance.
    this.setState({ value }, this.fireChangeEvent.bind(this, "onChange"));
  }

  pushSucceeding(value, minDistance, index) {
    let i;
    let padding;
    for (
      i = index, padding = value[i] + minDistance;
      value[i + 1] !== null && padding > value[i + 1];
      i += 1, padding = value[i] + minDistance
    ) {
      // eslint-disable-next-line no-param-reassign
      value[i + 1] = alignValue(padding, this.props);
    }
  }

  pushPreceding(value, minDistance, index) {
    for (
      let i = index, padding = value[i] - minDistance;
      value[i - 1] !== null && padding < value[i - 1];
      i -= 1, padding = value[i] - minDistance
    ) {
      // eslint-disable-next-line no-param-reassign
      value[i - 1] = alignValue(padding, this.props);
    }
  }

  axisKey() {
    if (this.props.orientation === "vertical") {
      return "Y";
    }
    // Defaults to 'horizontal';
    return "X";
  }

  orthogonalAxisKey() {
    if (this.props.orientation === "vertical") {
      return "X";
    }
    // Defaults to 'horizontal'
    return "Y";
  }

  posMinKey() {
    if (this.props.orientation === "vertical") {
      return this.props.invert ? "bottom" : "top";
    }
    // Defaults to 'horizontal'
    return this.props.invert ? "right" : "left";
  }

  posMaxKey() {
    if (this.props.orientation === "vertical") {
      return this.props.invert ? "top" : "bottom";
    }
    // Defaults to 'horizontal'
    return this.props.invert ? "left" : "right";
  }

  sizeKey() {
    if (this.props.orientation === "vertical") {
      return "clientHeight";
    }
    // Defaults to 'horizontal'
    return "clientWidth";
  }

  fireChangeEvent(event) {
    if (this.props[event]) {
      this.props[event](prepareOutValue(this.state.value), this.state.index);
    }
  }

  buildThumbStyle(offset, i) {
    const style = {
      position: "absolute",
      touchAction: "none",
      willChange: this.state.index >= 0 ? this.posMinKey() : undefined,
      zIndex: this.state.zIndices.indexOf(i) + 1,
    };
    style[this.posMinKey()] = `${offset}px`;
    return style;
  }

  buildTrackStyle(min, max) {
    const obj = {
      position: "absolute",
      willChange:
        this.state.index >= 0
          ? `${this.posMinKey()},${this.posMaxKey()}`
          : undefined,
    };
    obj[this.posMinKey()] = min;
    obj[this.posMaxKey()] = max;
    return obj;
  }

  buildMarkStyle(offset) {
    return {
      position: "absolute",
      [this.posMinKey()]: offset,
    };
  }

  renderThumb = (style, i) => {
    const className = `${this.props.thumbClassName} ${
      this.props.thumbClassName
    }-${i} ${this.state.index === i ? this.props.thumbActiveClassName : ""}`;

    const props = {
      ref: (r) => {
        this[`thumb${i}`] = r;
      },
      key: `${this.props.thumbClassName}-${i}`,
      className,
      style,
      onMouseDown: this.createOnMouseDown(i),
      onTouchStart: this.createOnTouchStart(i),
      onFocus: this.createOnKeyDown(i),
      tabIndex: 0,
      role: "slider",
      "aria-orientation": this.props.orientation,
      "aria-valuenow": this.state.value[i],
      "aria-valuemin": this.props.min,
      "aria-valuemax": this.props.max,
      "aria-label": Array.isArray(this.props.ariaLabel)
        ? this.props.ariaLabel[i]
        : this.props.ariaLabel,
      "aria-labelledby": Array.isArray(this.props.ariaLabelledby)
        ? this.props.ariaLabelledby[i]
        : this.props.ariaLabelledby,
    };

    const state = {
      index: i,
      value: prepareOutValue(this.state.value),
      valueNow: this.state.value[i],
    };

    if (this.props.ariaValuetext) {
      props["aria-valuetext"] =
        typeof this.props.ariaValuetext === "string"
          ? this.props.ariaValuetext
          : this.props.ariaValuetext(state);
    }

    return this.props.renderThumb(props, state);
  };

  renderThumbs(offset) {
    const { length } = offset;

    const styles = [];
    for (let i = 0; i < length; i += 1) {
      styles[i] = this.buildThumbStyle(offset[i], i);
    }

    const res = [];
    for (let i = 0; i < length; i += 1) {
      res[i] = this.renderThumb(styles[i], i);
    }
    return res;
  }

  renderTrack = (i, offsetFrom, offsetTo) => {
    const props = {
      key: `${this.props.trackClassName}-${i}`,
      className: `${this.props.trackClassName} ${this.props.trackClassName}-${i}`,
      style: this.buildTrackStyle(offsetFrom, this.state.upperBound - offsetTo),
    };
    const state = {
      index: i,
      value: prepareOutValue(this.state.value),
    };
    return this.props.renderTrack(props, state);
  };

  renderTracks(offset) {
    const tracks = [];
    const lastIndex = offset.length - 1;

    tracks.push(this.renderTrack(0, 0, offset[0]));

    for (let i = 0; i < lastIndex; i += 1) {
      tracks.push(this.renderTrack(i + 1, offset[i], offset[i + 1]));
    }

    tracks.push(
      this.renderTrack(lastIndex + 1, offset[lastIndex], this.state.upperBound)
    );

    return tracks;
  }

  renderMarks() {
    const { marks: marksProps } = this.props;
    let marks: number[] = [];
    const range = this.props.max - this.props.min + 1;

    if (typeof marks === "boolean") {
      marks = Array.from({ length: range }).map((_, key) => key);
    } else if (typeof marks === "number") {
      marks = Array.from({ length: range })
        .map((_, key) => key)
        .filter((key) => {
          return key % (marksProps as number) === 0;
        });
    }

    return marks
      .sort((a, b) => a - b)
      .map((mark) => {
        const offset = this.calcOffset(mark);

        const props = {
          key: mark,
          className: this.props.markClassName,
          style: this.buildMarkStyle(offset),
        };

        return this.props.renderMark(props);
      });
  }

  render() {
    const offset = [];
    const { value } = this.state;
    const l = value.length;
    for (let i = 0; i < l; i += 1) {
      offset[i] = this.calcOffset(value[i]);
    }

    const tracks = this.props.withTracks ? this.renderTracks(offset) : null;
    const thumbs = this.renderThumbs(offset);
    const marks = this.props.marks ? this.renderMarks() : null;

    return React.createElement(
      "div",
      {
        ref: (r) => {
          this.slider = r;
          this.resizeElementRef.current = r;
        },
        style: { position: "relative" },
        className:
          this.props.className + (this.props.disabled ? " disabled" : ""),
        onMouseDown: this.onSliderMouseDown,
        onClick: this.onSliderClick,
      },
      tracks,
      thumbs,
      marks
    );
  }
}

export default ReactSlider;
