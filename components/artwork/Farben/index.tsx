import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { Checkbox } from "../../Checkbox";
import { useUrlParams } from "../../../hooks/useUrlParams";

interface Props {
  width?: number;
  height?: number;
}

const PARAM_CONFIG = {
  space: { key: "sp", type: "number" as const, default: 5 },
  size: { key: "sz", type: "number" as const, default: 16 },
  saturation: { key: "sat", type: "number" as const, default: 75 },
  outline: { key: "ol", type: "boolean" as const, default: false },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const Farben = ({ width = 1000, height = 450 }: Props) => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleCheckboxChange = (key: string, val: boolean) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "256 Farben",
        artistName: "Gerhard Richter",
        year: "1974",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.643" },
        ],
      }}
      controls={[
        {
          key: "space",
          label: "Spacing",
          minStepMax: [5, 5, 20],
          value: values.space as number,
          onChange: handleChange,
        },
        {
          key: "size",
          label: "Columns",
          minStepMax: [4, 1, 16],
          value: values.size as number,
          onChange: handleChange,
        },
        {
          key: "saturation",
          label: "Saturation",
          minStepMax: [15, 5, 100],
          value: values.saturation as number,
          onChange: handleChange,
        },
      ]}
      customControls={
        <Checkbox
          keyName="outline"
          label="Outline"
          value={values.outline as boolean}
          handleChange={handleCheckboxChange}
        />
      }
      onReset={reset}
    >
      <Canvas
        width={width}
        height={height}
        space={values.space as number}
        size={values.size as number}
        saturation={values.saturation as number}
        outline={values.outline as boolean}
      />
    </ArtworkLayout>
  );
};

export default Farben;
