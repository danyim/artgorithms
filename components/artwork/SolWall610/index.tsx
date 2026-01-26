import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  colorIndex: { key: "ci", type: "number" as const, default: 0 },
  steps: { key: "st", type: "number" as const, default: 4 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolWall610CanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleOnMouseMove = () => {
    setValue("colorIndex", ((values.colorIndex as number) + 1) % 10);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #610",
        artistName: "Sol LeWitt",
        year: "1989",
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
          key: "colorIndex",
          label: "Color",
          minStepMax: [0, 1, 10],
          value: values.colorIndex as number,
          onChange: handleChange,
        },
        {
          key: "steps",
          label: "Steps",
          minStepMax: [2, 1, 8],
          value: values.steps as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        colorIndex={values.colorIndex as number}
        steps={values.steps as number}
        handleOnMouseMove={handleOnMouseMove}
      />
    </ArtworkLayout>
  );
};

export default SolWall610CanvasContainer;
