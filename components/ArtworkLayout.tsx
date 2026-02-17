import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import CanvasInputs from "./CanvasInputs";

interface ControlConfig {
  key: string;
  label: string;
  minStepMax: [number, number, number];
  value: number;
  onChange: (key: string, value: number) => void;
  mouseAxis?: "horizontal" | "vertical";
  locked?: boolean;
  onToggleLock?: (key: string) => void;
}

interface ArtworkInfo {
  title: string;
  artistName: string;
  year: number | string;
  instructions?: string; // How the artwork is made (step-by-step process)
  description?: string; // What the art consists of (descriptive text)
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

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.06) 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 9998;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;

    &::before {
      height: 80px;
    }
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
  }

  .links-label {
    font-weight: 600;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    margin-right: 0.25rem;
  }

  .links a {
    color: #666;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
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
      font: normal 400 0.875rem/1.7rem Inter, sans-serif;
      letter-spacing: 0.02rem;
      margin: 0 0 1rem;
    }

    .auxiliary {
      .placard-title {
        margin: 0 0 0.25rem;
      }

      .description {
        margin: 0;
      }
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
    font: normal 400 0.875rem/1.7rem Inter, sans-serif;
    letter-spacing: 0.02rem;
    margin: 0 0 1rem;
  }

  .auxiliary {
    .placard-title {
      margin: 0 0 0.25rem;
    }

    .description {
      margin: 0;
    }

    .links {
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
  }

  .links-label {
    font-weight: 600;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    margin-right: 0.25rem;
  }

  .links a {
    color: inherit;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
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
      if (control.locked) return;
      const [min, step, max] = control.minStepMax;
      const steps = Math.floor((max - min) / step);
      const randomStep = Math.floor(Math.random() * (steps + 1));
      const randomValue = min + randomStep * step;
      control.onChange(control.key, randomValue);
    });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "1") {
        const verticalControl = controls.find(
          (c) => c.mouseAxis === "vertical"
        );
        if (verticalControl?.onToggleLock) {
          verticalControl.onToggleLock(verticalControl.key);
        }
      } else if (e.key === "2") {
        const horizontalControl = controls.find(
          (c) => c.mouseAxis === "horizontal"
        );
        if (horizontalControl?.onToggleLock) {
          horizontalControl.onToggleLock(horizontalControl.key);
        }
      }
    },
    [controls]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
            mouseAxis={control.mouseAxis}
            locked={control.locked}
            onToggleLock={control.onToggleLock}
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
                <span className="links-label">Source(s) </span>
                {artwork.links.map((link, index) => (
                  <React.Fragment key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    {index < artwork.links.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </div>
            )}
          </MobilePlacard>
          <MobileControls>{renderControls()}</MobileControls>
        </MobileInfoRow>
        <MobileDescription>
          {artwork.description && (
            <p className="description">{artwork.description}</p>
          )}
          {artwork.instructions && (
            <div className="auxiliary">
              <h4 className="placard-title">Instructions</h4>
              <p className="description">{artwork.instructions}</p>
            </div>
          )}
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
          {artwork.description && (
            <p className="description">{artwork.description}</p>
          )}
          <div className="auxiliary">
            {artwork.instructions && (
              <>
                <h4 className="placard-title">Instructions</h4>
                <p className="description">{artwork.instructions}</p>
              </>
            )}
            {artwork.links && (
              <div className="links">
                <span className="links-label">Source(s) </span>
                {artwork.links.map((link, index) => (
                  <React.Fragment key={link.label}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                    {index < artwork.links.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </div>
            )}
            {renderControls()}
          </div>
        </DesktopPlacard>
      </PlacardColumn>
    </Grid>
  );
};

export default ArtworkLayout;
