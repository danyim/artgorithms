import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Inter, sans-serif;
  padding: 1.2rem 1.5rem;
  width: ${({ theme }) => theme.breakpoints.small};
  border-radius: 5px;

  h4.title {
    font: normal 500 1.7rem/1.7rem "Abel", sans-serif;
    text-transform: uppercase;
    margin: 0;
  }

  p.artist-name,
  .year {
    font: normal 300 1.1rem/1.2rem Inter, sans-serif;
    letter-spacing: -0.025rem;
  }

  p.artist-name {
    font-weight: 500;
    margin: 0.5rem 0;
  }

  hr {
    width: 100%;
    height: 0;
    border: 2px solid black;
    margin: 1rem 0;
  }
`;

interface Props {
  title: string;
  artistName: string;
  year: number | string;
  description: string | (() => JSX.Element);
}

export const Placard = ({ title, artistName, description, year }: Props) => {
  return (
    <Container>
      <h4 className="title">{title}</h4>
      <p className="artist-name">
        {artistName}
        <span className="year">, {year || "—"}</span>
      </p>
      <hr />
      {typeof description === "string" && <p>{description}</p>}
      {typeof description === "function" && description()}
    </Container>
  );
};
