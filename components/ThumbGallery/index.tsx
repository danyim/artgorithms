import Link from "next/link";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";
import { manifestArray } from "constants/art-manifest";
const Container = styled.div`
  margin: 2rem 0;

  display: flex;
  flex-flow: row nowrap;

  button {
    display: inline-block;
    font-size: 3rem;
    line-height: 100px;
    color: #999;
    background-color: transparent;
    border: none;
    outline-color: #aaa;
  }
  button:first-child {
  }
`;

const ThumbnailList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  /*
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpoints.small}) {
    max-width: 1vw;
  }
  */
`;
interface Props {}

export const ThumbGallery: React.FC<Props> = () => {
  return (
    <Container>
      <ThumbnailList>
        {manifestArray
          // Exclude the test canvas from appearing in the gallery
          .filter((m) => m.slug !== "test")
          .map((artwork) => (
            <Thumbnail
              key={artwork.slug}
              slug={artwork.slug}
              href={`/art/${artwork.slug}`}
            />
          ))}
      </ThumbnailList>
    </Container>
  );
};
export default ThumbGallery;
