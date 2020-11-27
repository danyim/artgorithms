import Link from "next/link";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";
import { manifest } from "constants/art-manifest";
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
  flex: row nowrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
interface Props {}

export const ThumbGallery = ({}: Props) => {
  return (
    <Container>
      {/* <button>◅</button> */}
      <ThumbnailList>
        {manifest.artworks.map((artwork) => (
          <Thumbnail
            key={artwork.slug}
            slug={artwork.slug}
            href={`/art/${artwork.slug}`}
          />
        ))}
      </ThumbnailList>
      {/* <button>▻</button> */}
    </Container>
  );
};
export default ThumbGallery;
