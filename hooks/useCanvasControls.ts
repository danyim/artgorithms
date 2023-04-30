import React from "react";
import { CanvasControl } from "types/types";

/** Maximum number of controls this hook can handle */
const MAX_CONTROLS = 5;

/**
 * Abstracts all the control logic into a custom hook. Allows for 5 controls max.
 * @param canvas
 * @returns
 */
export const useCanvasControls = (controls: CanvasControl[]) => {
  if (controls.length > MAX_CONTROLS) {
    console.warn(
      `More than ${MAX_CONTROLS} defined. Ignoring everything after index 4`
    );
  }

  /** Made a decision to support only 5 controls max since that's likely going to be the case with
   * all of the artwork. To support potentially infinite controls, it'd be better to create a
   * reducer to allow for reading state values. */
  const [
    defaultValueA,
    defaultValueB,
    defaultValueC,
    defaultValueD,
    defaultValueE,
  ] = controls.map((c) => c.defaultValue);
  const [controlA, setControlA] = React.useState<number>(defaultValueA);
  const [controlB, setControlB] = React.useState<number>(defaultValueB);
  const [controlC, setControlC] = React.useState<number>(defaultValueC);
  const [controlD, setControlD] = React.useState<number>(defaultValueD);
  const [controlE, setControlE] = React.useState<number>(defaultValueE);
  const values = [controlA, controlB, controlC, controlD, controlE];
  const setFns = [
    setControlA,
    setControlB,
    setControlC,
    setControlD,
    setControlE,
  ];

  /** Resets all controls to default values */
  function reset() {
    setControlA(defaultValueA);
    setControlB(defaultValueB);
    setControlC(defaultValueC);
    setControlD(defaultValueD);
    setControlE(defaultValueE);
  }

  /** Returns a value by key name */
  function get(key: string): number {
    const idx = controls.findIndex((c) => c.name === key);
    if (idx + 1 > MAX_CONTROLS) {
      console.warn(`set: index out of range`);
      return undefined;
    }
    if (idx < 0) {
      console.warn(`get: key "${key}" not found`);
      return undefined;
    }
    return values[idx];
  }

  /** Sets a value by key name */
  function set(key: string, value: number) {
    const idx = controls.findIndex((c) => c.name === key);
    if (idx + 1 > MAX_CONTROLS) {
      console.warn(`set: index out of range`);
      return undefined;
    }
    if (idx < 0) {
      console.warn(`set: key "${key}" not found`);
      return;
    }
    if (typeof setFns[idx] !== "function") {
      console.warn(`set: setFn[${idx}] is not a function`);
      return;
    }
    return setFns[idx](value);
  }

  function handleControlChange(key: string, val: number) {
    set(key, val);
  }

  return {
    /** Resets all values to their default */
    reset,
    /** Gets a value by key */
    get,
    /** Sets a value by key */
    set,
    /** Helper function for handling input changes */
    handleControlChange,
  };
};

export default useCanvasControls;
