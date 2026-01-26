import Canvas, { SIZE_MIN, SIZE_MAX } from "./Canvas";
import CirclesCanvas from "./CirclesCanvas";
import { CompositeCanvas1 } from "./CompositeCanvas1";
import { CompositeCanvas2 } from "./CompositeCanvas2";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 10 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolColorBandsCanvasContainer = () => {
  const { values, setValue, reset, locked, toggleLock } =
    useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleToggleLock = (key: string) => {
    toggleLock(key as ParamKey);
  };

  const canvasSize = 250;

  return (
    <ArtworkLayout
      artwork={{
        title: "Color Bands",
        artistName: "Sol LeWitt",
        year: "2000",
        instructions:
          "Parallel bands of color in four variations: straight horizontal, concentric circles, diagonal within a circle, and radiating from corners.",
        description:
          "Four variations on parallel color bands: horizontal stripes, concentric circles, diagonal sweeps, and corner radiations.",
      }}
      controls={[
        {
          key: "size",
          label: "Stroke",
          minStepMax: [SIZE_MIN, 1, SIZE_MAX],
          value: values.size as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.size,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas width={canvasSize} height={canvasSize} size={values.size as number} onSizeChange={locked.size ? undefined : (val) => setValue("size", val)} onReset={reset} />
      <CirclesCanvas width={canvasSize} height={canvasSize} size={values.size as number} onSizeChange={locked.size ? undefined : (val) => setValue("size", val)} />
      <CompositeCanvas1 width={canvasSize} height={canvasSize} size={values.size as number} onSizeChange={locked.size ? undefined : (val) => setValue("size", val)} />
      <CompositeCanvas2 width={canvasSize} height={canvasSize} size={values.size as number} onSizeChange={locked.size ? undefined : (val) => setValue("size", val)} />
    </ArtworkLayout>
  );
};

export default SolColorBandsCanvasContainer;
