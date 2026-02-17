import Canvas, { BANDS_MIN, BANDS_MAX } from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  bands: { key: "b", type: "number" as const, default: 12 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const DoubleConcentricContainer = () => {
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
        title: "Double Concentric: Scramble",
        artistName: "Frank Stella",
        year: "1971",
        instructions:
          "Draw two adjacent squares. Within each square, draw concentric square bands radiating inward. Color each band using a sequence of colors that shifts systematically between the two squares.",
        description:
          "Two adjacent squares filled with concentric color bands create interlocking geometric patterns through systematic color sequences.",
        links: [
          { label: "SF MOMA", url: "https://www.sfmoma.org/artwork/FC.311/" },
        ],
      }}
      controls={[
        {
          key: "bands",
          label: "Bands",
          minStepMax: [BANDS_MIN, 1, BANDS_MAX],
          value: values.bands as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.bands,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={250}
        bands={values.bands as number}
        onBandsChange={locked.bands ? undefined : (val) => setValue("bands", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default DoubleConcentricContainer;
