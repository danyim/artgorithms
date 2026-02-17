import Canvas, { BOX_SIZE_MIN, BOX_SIZE_MAX, PATTERN_MIN, PATTERN_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  pattern: { key: "pt", type: "number" as const, default: 2458 },
  boxSize: { key: "bs", type: "number" as const, default: 8 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const TemplateCanvasContainer = () => {
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
        title: "50/50",
        artistName: "Tauba Auerbach",
        year: "2008",
        instructions:
          "Fill a grid with black and white squares according to a binary pattern. Each unique pattern creates a different visual rhythm through the balance of positive and negative space.",
        description:
          "Black and white squares arranged according to binary patterns, exploring how simple rules generate complex visual textures.",
        links: [
          {
            label: "Tauba Auerbach",
            url: "https://taubaauerbach.com/view.php?id=133",
          },
        ],
      }}
      controls={[
        {
          key: "pattern",
          label: "Pattern",
          minStepMax: [PATTERN_MIN, 14, PATTERN_MAX],
          value: values.pattern as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.pattern,
          onToggleLock: handleToggleLock,
        },
        {
          key: "boxSize",
          label: "Size",
          minStepMax: [BOX_SIZE_MIN, 1, BOX_SIZE_MAX],
          value: values.boxSize as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.boxSize,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={384}
        height={512}
        pattern={values.pattern as number}
        boxSize={values.boxSize as number}
        onPatternChange={locked.pattern ? undefined : (val) => setValue("pattern", val)}
        onBoxSizeChange={locked.boxSize ? undefined : (val) => setValue("boxSize", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
