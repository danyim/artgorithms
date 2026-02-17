import Canvas, { SPACE_MIN, SPACE_MAX, LINE_WIDTH_MIN, LINE_WIDTH_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  space: { key: "sp", type: "number" as const, default: 10 },
  lineWidth: { key: "lw", type: "number" as const, default: 3 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const CanvasContainer = () => {
  const { values, setValue, reset, locked, toggleLock } =
    useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  const handleToggleLock = (key: string) => {
    toggleLock(key as ParamKey);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing 1: Drawing Series II 18 A",
        artistName: "Sol LeWitt",
        year: "1968",
        instructions:
          "Produce a 4x4 grid with a black border around each cell. Draw alternating black and white lines of consistent width in each in the following orientations starting from top left to bottom right (right-to-left): minor diagonal, vertical, vertical, minor diagonal, major diagonal, horizontal, horizontal, major diagonal, major diagonal, horizontal, horizontal, major diagonal, minor diagonal, vertical, vertical, minor diagonal.",
        description:
          "A systematic exploration of four line directions arranged within a grid. The repetition and rotation of vertical, horizontal, and diagonal elements create optical rhythms that exemplify LeWitt's conceptual approach.",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.474.2" },
          {
            label: "IdeelArt",
            url: "http://www.ideelart.com/module/csblog/post/177-1-sol-lewitt-wall-drawings.html",
          },
        ],
      }}
      controls={[
        {
          key: "space",
          label: "Spacing",
          minStepMax: [SPACE_MIN, 5, SPACE_MAX],
          value: values.space as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.space,
          onToggleLock: handleToggleLock,
        },
        {
          key: "lineWidth",
          label: "Thickness",
          minStepMax: [LINE_WIDTH_MIN, 2, LINE_WIDTH_MAX],
          value: values.lineWidth as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.lineWidth,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        space={values.space as number}
        lineWidth={values.lineWidth as number}
        onSpaceChange={locked.space ? undefined : (val) => setValue("space", val)}
        onLineWidthChange={locked.lineWidth ? undefined : (val) => setValue("lineWidth", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default CanvasContainer;
