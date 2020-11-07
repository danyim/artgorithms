import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Inter, sans-serif;
  border: 1px solid black;
  padding: 1.2rem 1.5rem;
  max-width: ${({ theme }) => theme.breakpoints.small};
  border-radius: 5px;

  h4 {
    font: normal 500 1.3rem/2 Abel;
    text-transform: uppercase;
    margin: 0;
  }

  p.artist-name {
    font: normal 200 1rem/1 Inter;
    letter-spacing: -0.025rem;
    margin: 0 0 0.5rem 0;
    position: relative;
  }
`;

interface Props {
  title: string;
  artistName: string;
  description: string | (() => JSX.Element);
}

export const Placard = ({ title, artistName, description }: Props) => {
  return (
    <Container>
      <h4>{title}</h4>
      <p className="artist-name">{artistName}</p>
      {typeof description === "string" && <p>{description}</p>}
      {typeof description === "function" && description()}
    </Container>
  );
};
