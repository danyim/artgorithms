import Canvas, {
  DENSITY_MIN,
  DENSITY_MAX,
  LINE_WIDTH_MIN,
  LINE_WIDTH_MAX,
} from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  density: { key: "d", type: "number" as const, default: 17500 },
  lineWidth: { key: "lw", type: "number" as const, default: 0.5 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const CanvasContainer = () => {
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
        title: "Wall Drawing #1180",
        artistName: "Sol LeWitt",
        year: "2005",
        instructions:
          "Within a circle, draw ten thousand straight lines at random.",
        description:
          "A circle densely filled with short lines at random angles. The accumulation of marks creates a textured surface that appears organic despite systematic generation.",
        links: [
          {
            label: "Fraenkel Gallery",
            url: "https://fraenkelgallery.com/exhibitions/sol-lewitt",
          },
        ],
      }}
      controls={[
        {
          key: "density",
          label: "Density",
          minStepMax: [DENSITY_MIN, 1000, DENSITY_MAX],
          value: values.density as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.density,
          onToggleLock: handleToggleLock,
        },
        {
          key: "lineWidth",
          label: "Thickness",
          minStepMax: [LINE_WIDTH_MIN, 0.25, LINE_WIDTH_MAX],
          value: values.lineWidth as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.lineWidth,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        density={values.density as number}
        lineWidth={values.lineWidth as number}
        onDensityChange={locked.density ? undefined : (val) => setValue("density", val)}
        onLineWidthChange={locked.lineWidth ? undefined : (val) => setValue("lineWidth", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default CanvasContainer;
