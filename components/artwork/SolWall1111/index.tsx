import React from "react";
import Canvas from "./Canvas";
import ArtworkLayout from "../../ArtworkLayout";

export const SolWall1111CanvasContainer = () => {
  const [bands, setBands] = React.useState(15);
  const [size, setSize] = React.useState(15);

  const handleReset = () => {
    setBands(15);
    setSize(15);
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "bands":
        setBands(val);
        break;
      case "size":
        setSize(val);
        break;
    }
  };

  return (
    <ArtworkLayout
      artwork={{
        title: "Wall Drawing #1111: Circle with Broken Bands of Color",
        artistName: "Sol LeWitt",
        year: "2003",
        links: [
          {
            label: "Sotheby's",
            url: "https://www.sothebys.com/en/auctions/ecatalogue/2018/contemporary-curated-n09824/lot.38.html",
          },
        ],
      }}
      controls={[
        {
          key: "size",
          label: "Stroke",
          minStepMax: [5, 5, 100],
          value: size,
          onChange: handleChange,
        },
        {
          key: "bands",
          label: "Bands",
          minStepMax: [3, 1, 35],
          value: bands,
          onChange: handleChange,
        },
      ]}
      onReset={handleReset}
    >
      <Canvas width={500} height={500} bands={bands} size={size} />
    </ArtworkLayout>
  );
};

export default SolWall1111CanvasContainer;
