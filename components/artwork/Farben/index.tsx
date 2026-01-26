import Canvas, { SIZE_MIN, SIZE_MAX, SPACE_MIN, SPACE_MAX } from "./Canvas";
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
  const { values, setValue, reset, locked, toggleLock } =
    useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleCheckboxChange = (key: string, val: boolean) => {
    setValue(key as ParamKey, val);
  };

  const handleToggleLock = (key: string) => {
    toggleLock(key as ParamKey);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "256 Farben",
        artistName: "Gerhard Richter",
        year: "1974",
        instructions:
          "Arrange colored rectangles in a grid. Colors are selected systematically from combinations of primary and secondary hues at varying saturations and values.",
        description:
          "A grid of colored rectangles arranged in rows and columns, showcasing a systematic permutation of colors derived from mixing primary hues.",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.643" },
        ],
      }}
      controls={[
        {
          key: "size",
          label: "Columns",
          minStepMax: [SIZE_MIN, 1, SIZE_MAX],
          value: values.size as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.size,
          onToggleLock: handleToggleLock,
        },
        {
          key: "space",
          label: "Spacing",
          minStepMax: [SPACE_MIN, 1, SPACE_MAX],
          value: values.space as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.space,
          onToggleLock: handleToggleLock,
        },
        {
          key: "saturation",
          label: "Saturation",
          minStepMax: [15, 5, 100],
          value: values.saturation as number,
          onChange: handleChange,
          locked: locked.saturation,
          onToggleLock: handleToggleLock,
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
        onSizeChange={locked.size ? undefined : (val) => setValue("size", val)}
        onSpaceChange={locked.space ? undefined : (val) => setValue("space", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default Farben;
