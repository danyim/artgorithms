import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  space: { key: "sp", type: "number" as const, default: 10 },
  lineWidth: { key: "lw", type: "number" as const, default: 3 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const CanvasContainer = () => {
  const { values, setValue, reset } = useUrlParams<ParamKey>(PARAM_CONFIG);

  const handleChange = (key: string, val: number) => {
    setValue(key as ParamKey, val);
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing 1: Drawing Series II 18 A",
        artistName: "Sol LeWitt",
        year: "1968",
        description: (
          <>
            <h4 className="placard-title">Instructions</h4>
            <p className="placard">
              Produce a 4x4 grid with a black border around each cell. Draw
              alternating black and white lines of consistent width in each in
              the following orientations starting from top left to bottom right
              (right-to-left): minor diagonal, vertical, vertical, minor
              diagonal, major diagonal, horizontal, horizontal, major diagonal,
              major diagonal, horizontal, horizontal, major diagonal, minor
              diagonal, vertical, vertical, minor diagonal.
            </p>
          </>
        ),
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
          minStepMax: [5, 5, 50],
          value: values.space as number,
          onChange: handleChange,
        },
        {
          key: "lineWidth",
          label: "Thickness",
          minStepMax: [1, 2, 11],
          value: values.lineWidth as number,
          onChange: handleChange,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        space={values.space as number}
        lineWidth={values.lineWidth as number}
      />
    </ArtworkLayout>
  );
};

export default CanvasContainer;
