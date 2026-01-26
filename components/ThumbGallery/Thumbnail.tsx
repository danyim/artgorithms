import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListItem = styled.li<{ $isActive?: boolean }>`
  margin: 2rem 0.75rem;
  height: 100px;
  width: 100px;
  cursor: pointer;
  flex-shrink: 0;
  opacity: ${({ $isActive }) => ($isActive ? 0.2 : 1)};

  & > label {
    width: 100px;
    display: block;
    text-align: center;
    color: ${({ $isActive }) => ($isActive ? "#fff" : "#444")};
    background-color: ${({ $isActive }) => ($isActive ? "#000" : "transparent")};
    font: normal 400 0.8rem/1rem Inter, sans-serif;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    pointer-events: none;
    margin: 1rem 0;
    padding: ${({ $isActive }) => ($isActive ? "0.25rem 0" : "0")};
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
  isActive?: boolean;
}

export const Thumbnail: React.FC<Props> = ({ href, slug, isActive }) => {
  const [thumnailPath, setThumnailPath] = useState("");

  useEffect(() => setThumnailPath(`/thumb/${slug}.png`), [slug]);

  return (
    <Link href={href}>
      <ListItem title={slug} $isActive={isActive}>
        <FlexContainer $thumbnailPath={thumnailPath}></FlexContainer>
        <label>{replaceDash(slug)}</label>
      </ListItem>
    </Link>
  );
};
export default Thumbnail;
