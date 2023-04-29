import React from "react";
import { CanvasControl } from "types/types";
import ArtContainer from "components/ArtContainer";
import { ArtworkMetadata } from "types/types";
import draw from "./draw";

const metadata: ArtworkMetadata = {
  title: "Test Canvas",
  artistName: "Self",
  year: 2023,
  description: "Test description for artwork",
  links: [
    ["SFMOMA 1", "https://www.sfmoma.org/artwork/FC.474.2"],
    ["SFMOMA 2", "https://www.sfmoma.org/artwork/FC.474.2"],
    ["SFMOMA 3", "https://www.sfmoma.org/artwork/FC.474.2"],
  ],
  slug: "",
};

const controls: CanvasControl[] = [
  {
    name: "space",
    label: "Space",
    minStepMax: [5, 5, 50],
    defaultValue: 10,
  },
  {
    name: "lineWidth",
    label: "Thickness",
    minStepMax: [1, 2, 11],
    defaultValue: 3,
  },
];

interface Props {}

export const Container = () => {
  return (
    <ArtContainer
      artworkMetadata={metadata}
      controls={controls}
      drawfn={draw}
      width={500}
      height={500}
    />
  );
};

export default Container;
