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
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.25rem;

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

const MobileDescription = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 90vw;
    margin: 0 auto;

    .description {
      font: normal 400 0.9rem/1.4rem Inter, sans-serif;
      margin: 0;
      color: #444;
    }
  }
`;

const DesktopPlacard = styled.div`
  font-family: Inter, sans-serif;
  padding: 1.2rem 1.5rem;
  width: ${({ theme }) => theme.breakpoints.small};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.25rem;

  hr {
    width: 100%;
    height: 0;
    border: none;
    border-bottom: 4px solid black;
    margin: 1rem 0;
  }

  .description {
    font:
      normal 400 1rem/1.7rem Inter,
      sans-serif;
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
  const handleRandom = () => {
    controls.forEach((control) => {
      const [min, step, max] = control.minStepMax;
      const steps = Math.floor((max - min) / step);
      const randomStep = Math.floor(Math.random() * (steps + 1));
      const randomValue = min + randomStep * step;
      control.onChange(control.key, randomValue);
    });
  };

  const renderControls = () => {
    if ((controls.length === 0 && !customControls) || !onReset) return null;

    return (
      <CanvasInputs
        onReset={onReset}
        onRandom={controls.length > 0 ? handleRandom : undefined}
      >
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
            <p className="artist-name">{artwork.artistName}</p>
            <p className="artwork-info">
              <span className="title">{artwork.title}</span>
            </p>
            <p className="artwork-year">{artwork.year}</p>
            {artwork.links && (
              <div className="links">
                {artwork.links.map((link) => (
                  <React.Fragment key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
        <MobileDescription>
          {artwork.description &&
            (typeof artwork.description === "string" ? (
              <p className="description">{artwork.description}</p>
            ) : (
              <div className="description">{artwork.description}</div>
            ))}
        </MobileDescription>
      </CanvasColumn>
      {/* Desktop: Full placard with controls */}
      <PlacardColumn>
        <DesktopPlacard>
          <p className="artist-name">{artwork.artistName}</p>
          <p className="artwork-info">
            <span className="title">{artwork.title}</span>
          </p>
          <p className="artwork-year">{artwork.year}</p>
          <hr />
          {artwork.description &&
            (typeof artwork.description === "string" ? (
              <p className="description">{artwork.description}</p>
            ) : (
              <div className="description">{artwork.description}</div>
            ))}
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
