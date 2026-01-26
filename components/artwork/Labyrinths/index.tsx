import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 6 },
  pattern: { key: "pt", type: "number" as const, default: 0 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const TemplateCanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Hermetic One-way Labyrinths",
        artistName: "Thomas Laubenberger",
        year: "2011",
        links: [
          {
            label: "Thomas Laubenberger",
            url: "https://www.instagram.com/p/B2oFOHcF3qQ",
          },
        ],
      }}
      controls={[
        {
          key: "size",
          label: "Size",
          minStepMax: [2, 1, 10],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "pattern",
          label: "Pattern",
          minStepMax: [0, 1, 35],
          value: values.pattern as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        size={values.size as number}
        pattern={values.pattern as number}
      />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
