import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  bands: { key: "b", type: "number" as const, default: 12 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const DoubleConcentricContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Double Concentric: Scramble",
        artistName: "Frank Stella",
        year: "1971",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.311/" },
        ],
      }}
      controls={[
        {
          key: "bands",
          label: "Bands",
          minStepMax: [2, 1, 20],
          value: values.bands as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas width={500} height={250} bands={values.bands as number} />
    </ArtworkLayout>
  );
};

export default DoubleConcentricContainer;
