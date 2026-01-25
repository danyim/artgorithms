import React from "react";
import styled from "styled-components";
import Slider from "./Slider";
import CanvasInputs from "./CanvasInputs";

interface ControlConfig {
  key: string;
  label: string;
  minStepMax: [number, number, number];
  value: number;
  onChange: (key: string, value: number) => void;
}

interface ArtworkInfo {
  title: string;
  artistName: string;
  year: number | string;
  description?: string | React.ReactNode;
  links?: { label: string; url: string }[];
}

interface Props {
  children: React.ReactNode; // The canvas component
  controls?: ControlConfig[];
  customControls?: React.ReactNode; // For non-slider controls
  onReset?: () => void;
  artwork: ArtworkInfo;
}

const Grid = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin: 3rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
  }
`;

const CanvasColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  canvas {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 100%;

    canvas {
      max-width: 90vw;
    }
  }
`;

const PlacardColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileInfoRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 90vw;
    margin: 1rem auto;
    gap: 1rem;
  }
`;

const MobilePlacard = styled.div`
  flex: 1;

  h4 {
    font: normal 500 1.2rem/1.4rem "Abel", sans-serif;
    text-transform: uppercase;
    margin: 0 0 0.25rem 0;
  }

  .artist {
    font: normal 300 0.9rem/1.1rem Inter, sans-serif;
    margin: 0;
  }

  .links {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  a {
    color: #666;
  }
`;

const MobileControls = styled.div`
  flex: 1;
`;

const DesktopPlacard = styled.div`
  font-family: Inter, sans-serif;
  padding: 1.2rem 1.5rem;
  width: ${({ theme }) => theme.breakpoints.small};
  border-radius: 5px;

  h4 {
    font: normal 500 1.7rem/2rem "Abel", sans-serif;
    text-transform: uppercase;
    margin: 0;
  }

  .artist {
    font: normal 300 1.1rem/1.2rem Inter, sans-serif;
    letter-spacing: -0.025rem;
    font-weight: 500;
    margin: 0.5rem 0;
  }

  hr {
    width: 100%;
    height: 0;
    border: none;
    border-bottom: 4px solid black;
    margin: 1rem 0;
  }

  .description {
    font: normal 400 1rem/1.7rem Inter, sans-serif;
    margin: 0.5rem 0;
  }

  .links {
    font-size: 0.85rem;
  }

  a {
    color: inherit;
  }
`;

export const ArtworkLayout: React.FC<Props> = ({
  children,
  controls = [],
  customControls,
  onReset,
  artwork,
}) => {
  const renderControls = () => {
    if ((controls.length === 0 && !customControls) || !onReset) return null;

    return (
      <CanvasInputs onReset={onReset}>
        {controls.map((control) => (
          <Slider
            key={control.key}
            keyName={control.key}
            label={control.label}
            minStepMax={control.minStepMax}
            value={control.value}
            handleChange={control.onChange}
          />
        ))}
        {customControls}
      </CanvasInputs>
    );
  };

  return (
    <Grid>
      <CanvasColumn>
        {children}
        {/* Mobile: Placard info on left, controls on right */}
        <MobileInfoRow>
          <MobilePlacard>
            <h4>{artwork.title}</h4>
            <p className="artist">
              {artwork.artistName}, {artwork.year}
            </p>
            {artwork.links && (
              <div className="links">
                {artwork.links.map((link) => (
                  <React.Fragment key={link.label}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                    &nbsp;
                  </React.Fragment>
                ))}
              </div>
            )}
          </MobilePlacard>
          <MobileControls>{renderControls()}</MobileControls>
        </MobileInfoRow>
      </CanvasColumn>
      {/* Desktop: Full placard with controls */}
      <PlacardColumn>
        <DesktopPlacard>
          <h4>{artwork.title}</h4>
          <p className="artist">
            {artwork.artistName}, {artwork.year}
          </p>
          <hr />
          {artwork.description && (
            typeof artwork.description === "string" ? (
              <p className="description">{artwork.description}</p>
            ) : (
              <div className="description">{artwork.description}</div>
            )
          )}
          {artwork.links && (
            <div className="links">
              {artwork.links.map((link) => (
                <React.Fragment key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                  &nbsp;
                </React.Fragment>
              ))}
            </div>
          )}
          {renderControls()}
        </DesktopPlacard>
      </PlacardColumn>
    </Grid>
  );
};

export default ArtworkLayout;
