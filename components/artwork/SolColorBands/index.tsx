import Canvas from "./Canvas";
import CirclesCanvas from "./CirclesCanvas";
import { CompositeCanvas1 } from "./CompositeCanvas1";
import { CompositeCanvas2 } from "./CompositeCanvas2";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 10 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolColorBandsCanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const canvasSize = 250;

  return (
    <ArtworkLayout
      artwork={{
        title: "Color Bands",
        artistName: "Sol LeWitt",
        year: "2000",
      }}
      controls={[
        {
          key: "size",
          label: "Stroke",
          minStepMax: [3, 1, 50],
          value: values.size as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas width={canvasSize} height={canvasSize} size={values.size as number} onReset={reset} />
      <CirclesCanvas width={canvasSize} height={canvasSize} size={values.size as number} />
      <CompositeCanvas1 width={canvasSize} height={canvasSize} size={values.size as number} />
      <CompositeCanvas2 width={canvasSize} height={canvasSize} size={values.size as number} />
    </ArtworkLayout>
  );
};

export default SolColorBandsCanvasContainer;
