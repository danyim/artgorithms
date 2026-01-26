import Canvas from "./Canvas";
import CanvasSquare from "./CanvasSquare";
import CanvasX from "./CanvasX";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  space: { key: "sp", type: "number" as const, default: 10 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolWall370CanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #370",
        artistName: "Sol LeWitt",
        year: "1982",
        links: [
          {
            label: "NYC MET",
            url: "https://www.metmuseum.org/exhibitions/listings/2014/sol-lewitt",
          },
        ],
      }}
      controls={[
        {
          key: "space",
          label: "Spacing",
          minStepMax: [5, 5, 50],
          value: values.space as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas width={300} height={300} space={values.space as number} onReset={reset} />
      <CanvasSquare width={300} height={300} space={values.space as number} />
      <CanvasX width={300} height={300} space={values.space as number} />
    </ArtworkLayout>
  );
};

export default SolWall370CanvasContainer;
