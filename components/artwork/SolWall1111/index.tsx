import Canvas, {
  FRAGMENTATION_MIN,
  FRAGMENTATION_MAX,
  COLOR_OFFSET_MIN,
  COLOR_OFFSET_MAX,
} from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";
import { useUrlParams } from "../../../hooks/useUrlParams";

const PARAM_CONFIG = {
  size: { key: "sz", type: "number" as const, default: 15 },
  bands: { key: "b", type: "number" as const, default: 15 },
  fragmentation: { key: "fr", type: "number" as const, default: 25 },
  colorOffset: { key: "co", type: "number" as const, default: 0 },
};

type ParamKey = keyof typeof PARAM_CONFIG;

export const SolWall1111CanvasContainer = () => {
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
        title: "Wall Drawing #1111: Circle with Broken Bands of Color",
        artistName: "Sol LeWitt",
        year: "2003",
        instructions:
          "A circle divided into concentric bands of color. Each band is broken into segments, with colors shifting systematically around the circumference.",
        description:
          "Vibrant concentric rings radiate outward, their colors fragmenting and shifting as they spiral around the center. Systematic color progressions create movement and depth within a static geometric form.",
        links: [
          {
            label: "Sotheby's",
            url: "https://www.sothebys.com/en/auctions/ecatalogue/2018/contemporary-curated-n09824/lot.38.html",
          },
        ],
      }}
      controls={[
        {
          key: "fragmentation",
          label: "Fragmentation",
          minStepMax: [FRAGMENTATION_MIN, 5, FRAGMENTATION_MAX],
          value: values.fragmentation as number,
          onChange: handleChange,
          mouseAxis: "horizontal",
          locked: locked.fragmentation,
          onToggleLock: handleToggleLock,
        },
        {
          key: "colorOffset",
          label: "Color Offset",
          minStepMax: [COLOR_OFFSET_MIN, 1, COLOR_OFFSET_MAX],
          value: values.colorOffset as number,
          onChange: handleChange,
          mouseAxis: "vertical",
          locked: locked.colorOffset,
          onToggleLock: handleToggleLock,
        },
        {
          key: "size",
          label: "Stroke",
          minStepMax: [5, 5, 100],
          value: values.size as number,
          onChange: handleChange,
          locked: locked.size,
          onToggleLock: handleToggleLock,
        },
        {
          key: "bands",
          label: "Bands",
          minStepMax: [3, 1, 35],
          value: values.bands as number,
          onChange: handleChange,
          locked: locked.bands,
          onToggleLock: handleToggleLock,
        },
      ]}
      onReset={reset}
    >
      <Canvas
        width={500}
        height={500}
        bands={values.bands as number}
        size={values.size as number}
        fragmentation={values.fragmentation as number}
        colorOffset={values.colorOffset as number}
        onFragmentationChange={locked.fragmentation ? undefined : (val) => setValue("fragmentation", val)}
        onColorOffsetChange={locked.colorOffset ? undefined : (val) => setValue("colorOffset", val)}
        onReset={reset}
      />
    </ArtworkLayout>
  );
};

export default SolWall1111CanvasContainer;
