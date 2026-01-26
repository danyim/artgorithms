import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  bandCount: { key: "b", type: "number" as const, default: 7 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const FlowingRibbonsContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Flowing Ribbons",
        artistName: "Unknown",
        year: "c. 1970s",
        description:
          "A 70s-inspired pattern of flowing, wave-like ribbons with concentric color bands creating a psychedelic gradient effect.",
      }}
      controls={[
        {
          key: "bandCount",
          label: "Bands",
          minStepMax: [3, 1, 12],
          value: values.bandCount as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        bandCount={values.bandCount as number}
      />
    </ArtworkLayout>
  );
};

export default FlowingRibbonsContainer;
