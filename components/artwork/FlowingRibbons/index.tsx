import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  bandCount: { key: "b", type: "number" as const, default: 7 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const FlowingRibbonsContainer = () => {
  const { values, setValue, reset, locked, toggleLock } =
    useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleToggleLock = (key: string) => {
    toggleLock(key as ParamKey);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Flowing Ribbons",
        artistName: "Unknown",
        year: "c. 1970s",
        instructions:
          "Draw sinusoidal wave ribbons across the canvas. Fill each ribbon with concentric bands of color that shift through the spectrum from edge to edge.",
        description:
          "Flowing wave-like ribbons with concentric color bands create a psychedelic gradient effect inspired by 1970s graphic design.",
      }}
      controls={[
        {
          key: "bandCount",
          label: "Bands",
          minStepMax: [3, 1, 12],
          value: values.bandCount as number,
          onChange: handleChange,
          locked: locked.bandCount,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        bandCount={values.bandCount as number}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default FlowingRibbonsContainer;
