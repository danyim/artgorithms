import Canvas, { BOX_SIZE_MIN, BOX_SIZE_MAX, PATTERN_MIN, PATTERN_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  pattern: { key: "pt", type: "number" as const, default: 2458 },
  boxSize: { key: "bs", type: "number" as const, default: 8 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const TemplateCanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "50/50",
        artistName: "Tauba Auerbach",
        year: "2008",
        description: (
          <>
            <h4 className="placard-title">Instructions</h4>
            <p className="placard">
              A repeating pattern of 3x4 squares on a 16x16 grid
            </p>
          </>
        ),
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
        },
        {
          key: "boxSize",
          label: "Size",
          minStepMax: [BOX_SIZE_MIN, 1, BOX_SIZE_MAX],
          value: values.boxSize as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={384}
        height={512}
        pattern={values.pattern as number}
        boxSize={values.boxSize as number}
        onPatternChange={(val) => setValue("pattern", val)}
        onBoxSizeChange={(val) => setValue("boxSize", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default TemplateCanvasContainer;
