import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListItem = styled.li`
  margin: 2rem 0.75rem;
  height: 100px;
  width: 100px;
  cursor: pointer;
  flex-shrink: 0;

  & > label {
    width: 100px;
    display: block;
    text-align: center;
    color: #444;
    font: normal 400 0.8rem/1rem Inter, sans-serif;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    pointer-events: none;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    height: auto;
    width: 80px;
    margin: 0.5rem;

    & > label {
      width: 80px;
      font-size: 0.65rem;
      margin: 0.5rem 0;
    }
  }
`;

const FlexContainer = styled.div<{ $thumbnailPath: string }>`
  display: flex;
  border-radius: 10px;
  background-color: #c0c0c0;
  width: 100%;
  height: 100px;
  background-image: ${({ $thumbnailPath }) => `url('${$thumbnailPath}')`};
  background-size: cover;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const replaceDash = (str: string) => str?.replace("-", " ") ?? str;

interface Props {
  slug: string;
  href: string;
}

export const Thumbnail: React.FC<Props> = ({ href, slug }) => {
  const [thumnailPath, setThumnailPath] = useState("");

  useEffect(() => setThumnailPath(`/thumb/${slug}.png`), [slug]);

  return (
    <Link href={href}>
      <ListItem title={slug}>
        <FlexContainer $thumbnailPath={thumnailPath}></FlexContainer>
        <label>{replaceDash(slug)}</label>
      </ListItem>
    </Link>
  );
};
export default Thumbnail;
