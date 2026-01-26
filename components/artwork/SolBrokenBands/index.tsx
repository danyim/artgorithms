import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  saturation: { key: "sat", type: "number" as const, default: 10 },
  bands: { key: "b", type: "number" as const, default: 16 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolBrokenBandsCanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Broken Color Bands in Four Directions",
        artistName: "Sol LeWitt",
        year: "2005",
        instructions:
          "Four rectangles, each with parallel color bands in a different direction: horizontal, vertical, and two diagonals. Bands are segmented with shifting colors.",
        description:
          "Four panels present parallel bands of color oriented in different directions. The fragmentation into segments of shifting hues creates a staccato rhythm of chromatic variation.",
        links: [
          {
            label: "Sol LeWitt Prints",
            url: "https://www.sollewittprints.org/artwork/lewitt-raisonne-2005-04/",
          },
        ],
      }}
      controls={[
        {
          key: "saturation",
          label: "Saturation",
          minStepMax: [0, 1, 10],
          value: values.saturation as number,
          onChange: handleChange,
        },
        {
          key: "bands",
          label: "Bands",
          minStepMax: [4, 1, 32],
          value: values.bands as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={800}
        height={200}
        saturation={values.saturation as number}
        bands={values.bands as number}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default SolBrokenBandsCanvasContainer;
