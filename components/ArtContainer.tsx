import React from "react";
import CanvasRenderer from "./CanvasRenderer";
import { Placard } from "./Placard";
import Slider from "./Slider";
import CanvasInputs from "./CanvasInputs";
import { CanvasControl, DrawCanvasFn } from "types/types";
import useCanvasControls from "hooks/useCanvasControls";
import { ArtworkMetadata } from "types/types";

function mapControlLabels(controls: CanvasControl[]): string[] {
  return controls.map((control) => control.name);
}

interface Props {
  artworkMetadata: ArtworkMetadata;
  controls: CanvasControl[];
  drawfn: DrawCanvasFn;
}

export const ArtContainer = ({ drawfn, controls, artworkMetadata }: Props) => {
  const {
    reset,
    get,
    handleControlChange,
    controlA,
    controlB,
    controlC,
    controlD,
    controlE,
  } = useCanvasControls(controls);
  const { width, height } = artworkMetadata;
  const controlLabels = mapControlLabels(controls);

  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col">
        <CanvasRenderer
          width={width}
          height={height}
          drawfn={drawfn}
          controlLabels={controlLabels}
          {...{ controlA, controlB, controlC, controlD, controlE }}
        />
        {/* <InteractableCanvas width={500} height={500} /> */}
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Placard
          title={artworkMetadata.title}
          artistName={artworkMetadata.artistName}
          year={artworkMetadata.year}
          description={() => (
            <>
              <p
                className="placard"
                dangerouslySetInnerHTML={{
                  __html: artworkMetadata.description,
                }}
              />
              <small>
                {artworkMetadata.links.map((v) => {
                  const [label, url] = v;
                  return (
                    <React.Fragment key={label}>
                      <a href={url} target="_blank">
                        {label}
                      </a>
                      &nbsp;
                    </React.Fragment>
                  );
                })}
              </small>
              <p></p>
              <CanvasInputs onReset={reset}>
                <>
                  {controls.map((control) => (
                    <Slider
                      key={control.name}
                      keyName={control.name}
                      label={control.label}
                      minStepMax={control.minStepMax}
                      value={get(control.name)}
                      handleChange={handleControlChange}
                    />
                  ))}
                </>
              </CanvasInputs>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default ArtContainer;
