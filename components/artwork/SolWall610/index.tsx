import Canvas, {
  SKEW_MIN,
  SKEW_MAX,
  STEPS_MIN,
  STEPS_MAX,
} from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  skew: { key: "sk", type: "number" as const, default: 0.8 },
  steps: { key: "st", type: "number" as const, default: 4 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolWall610CanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #610",
        artistName: "Sol LeWitt",
        year: "1989",
        instructions:
          "Within six adjacent squares, draw superimposed arcs from the corners and midpoints. The arcs are rendered in graduated ink washes from light to dark.",
        description:
          "Sweeping arcs intersect and overlap across a grid of squares, rendered in gradations from pale gray to deep black. The layered curves create moiré-like interference patterns and an illusion of depth.",
        links: [
          {
            label: "Artsy",
            url: "https://www.artsy.net/show/yale-university-art-gallery-sol-lewitt-wall-drawings-expanding-a-legacy",
          },
          { label: "MoCA", url: "https://massmoca.org/event/walldrawing610/" },
        ],
      }}
      controls={[
        {
          key: "skew",
          label: "Skew",
          minStepMax: [SKEW_MIN, 0.1, SKEW_MAX],
          value: values.skew as number,
          onChange: handleChange,
        },
        {
          key: "steps",
          label: "Steps",
          minStepMax: [STEPS_MIN, 1, STEPS_MAX],
          value: values.steps as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        skew={values.skew as number}
        steps={values.steps as number}
        onSkewChange={(val) => setValue("skew", val)}
        onStepsChange={(val) => setValue("steps", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default SolWall610CanvasContainer;
