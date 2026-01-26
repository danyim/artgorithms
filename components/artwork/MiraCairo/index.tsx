import Canvas, {
  AMPLITUDE_MIN,
  AMPLITUDE_MAX,
  STRETCH_MIN,
  STRETCH_MAX,
  THRESHOLD_MIN,
  THRESHOLD_MAX,
} from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  gridSize: { key: "g", type: "number" as const, default: 75 },
  noiseScale: { key: "ns", type: "number" as const, default: 7 },
  threshold: { key: "t", type: "number" as const, default: 0.5 },
  amplitude: { key: "a", type: "number" as const, default: 0.1 },
  stretch: { key: "st", type: "number" as const, default: 1.0 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const MiraCairoContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Mira Cairo",
        artistName: "Verner Panton",
        year: "1990",
        instructions:
          "Draw a grid of hollow squares. Apply Perlin noise to determine which squares are filled black and which remain white, creating organic wave patterns.",
        description:
          "A grid of hollow squares creates a pixel-like rendering of organic wave patterns. The contrast between dark and light forms flowing shapes reminiscent of topographical contours.",
      }}
      controls={[
        {
          key: "gridSize",
          label: "Grid Size",
          minStepMax: [40, 5, 100],
          value: values.gridSize as number,
          onChange: handleChange,
        },
        {
          key: "noiseScale",
          label: "Wave Scale",
          minStepMax: [2, 0.5, 8],
          value: values.noiseScale as number,
          onChange: handleChange,
        },
        {
          key: "threshold",
          label: "Threshold",
          minStepMax: [THRESHOLD_MIN, 0.05, THRESHOLD_MAX],
          value: values.threshold as number,
          onChange: handleChange,
        },
        {
          key: "amplitude",
          label: "Amplitude",
          minStepMax: [AMPLITUDE_MIN, 0.01, AMPLITUDE_MAX],
          value: values.amplitude as number,
          onChange: handleChange,
        },
        {
          key: "stretch",
          label: "Stretch",
          minStepMax: [STRETCH_MIN, 0.02, STRETCH_MAX],
          value: values.stretch as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={726}
        gridSize={values.gridSize as number}
        noiseScale={values.noiseScale as number}
        threshold={values.threshold as number}
        amplitude={values.amplitude as number}
        stretch={values.stretch as number}
        onAmplitudeChange={(val) => setValue("amplitude", val)}
        onStretchChange={(val) => setValue("stretch", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default MiraCairoContainer;
