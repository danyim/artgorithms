import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 15 },
  bands: { key: "b", type: "number" as const, default: 15 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolWall1111CanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #1111: Circle with Broken Bands of Color",
        artistName: "Sol LeWitt",
        year: "2003",
        links: [
          {
            label: "Sotheby's",
            url: "https://www.sothebys.com/en/auctions/ecatalogue/2018/contemporary-curated-n09824/lot.38.html",
          },
        ],
      }}
      controls={[
        {
          key: "size",
          label: "Stroke",
          minStepMax: [5, 5, 100],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "bands",
          label: "Bands",
          minStepMax: [3, 1, 35],
          value: values.bands as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        bands={values.bands as number}
        size={values.size as number}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default SolWall1111CanvasContainer;
