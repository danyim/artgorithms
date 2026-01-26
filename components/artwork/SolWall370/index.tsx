import Canvas, { SPACE_MIN, SPACE_MAX, ROTATION_MIN, ROTATION_MAX } from "./Canvas";
import CanvasSquare from "./CanvasSquare";
import CanvasX from "./CanvasX";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  space: { key: "sp", type: "number" as const, default: 10 },
  rotation: { key: "r", type: "number" as const, default: 90 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolWall370CanvasContainer = () => {
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
        title: "Wall Drawing #370",
        artistName: "Sol LeWitt",
        year: "1982",
        instructions:
          "Draw ten thousand lines within a shape (circle, square, or X). Lines are randomly distributed and oriented, creating a dense texture that reveals the underlying form.",
        description:
          "Dense fields of short random lines fill geometric shapes, creating textured surfaces through the accumulation of thousands of individual marks.",
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
          minStepMax: [SPACE_MIN, 5, SPACE_MAX],
          value: values.space as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.space,
          onToggleLock: handleToggleLock,
        },
        {
          key: "rotation",
          label: "Rotation",
          minStepMax: [ROTATION_MIN, 22.5, ROTATION_MAX],
          value: values.rotation as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.rotation,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={300}
        height={300}
        space={values.space as number}
        rotation={values.rotation as number}
        onSpaceChange={locked.space ? undefined : (val) => setValue("space", val)}
        onRotationChange={locked.rotation ? undefined : (val) => setValue("rotation", val)}
        onReset={reset}
      />
      <CanvasSquare width={300} height={300} space={values.space as number} rotation={values.rotation as number} />
      <CanvasX width={300} height={300} space={values.space as number} rotation={values.rotation as number} />
    </ArtworkLayout>
  );
};

export default SolWall370CanvasContainer;
