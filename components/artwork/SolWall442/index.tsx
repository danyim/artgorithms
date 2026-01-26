import Canvas, {
  RAY_LENGTH_MIN,
  RAY_LENGTH_MAX,
  SECTIONS_MIN,
  SECTIONS_MAX,
  VARIATION_MIN,
  VARIATION_MAX,
} from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  rayLength: { key: "r", type: "number" as const, default: 1 },
  sections: { key: "s", type: "number" as const, default: 4 },
  variation: { key: "v", type: "number" as const, default: 50 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const CanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #442",
        artistName: "Sol LeWitt",
        year: "1985",
        instructions:
          "A wall is divided by three straight lines from a point on the left side to points on the right side. The areas between are filled in with blue, yellow, red, and orange india ink washes.",
        description:
          "Four triangular forms fan outward from a single apex on the left. Each triangle is filled with a different india ink wash against a muted blue background.",
        links: [
          {
            label: "SFMOMA Collection",
            url: "https://www.sfmoma.org/artwork/92.189/",
          },
          {
            label: "Mass MoCA Sol LeWitt",
            url: "https://massmoca.org/sol-lewitt/",
          },
        ],
      }}
      controls={[
        {
          key: "sections",
          label: "Sections",
          minStepMax: [SECTIONS_MIN, 1, SECTIONS_MAX],
          value: values.sections as number,
          onChange: handleChange,
        },
        {
          key: "rayLength",
          label: "Ray Length",
          minStepMax: [RAY_LENGTH_MIN, 0.05, RAY_LENGTH_MAX],
          value: values.rayLength as number,
          onChange: handleChange,
          mouseAxis: "vertical",
        },
        {
          key: "variation",
          label: "Variation",
          minStepMax: [VARIATION_MIN, 5, VARIATION_MAX],
          value: values.variation as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={650}
        height={520}
        rayLength={values.rayLength as number}
        sections={values.sections as number}
        variation={values.variation as number}
        onRayLengthChange={(val) => setValue("rayLength", val)}
        onVariationChange={(val) => setValue("variation", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default CanvasContainer;
