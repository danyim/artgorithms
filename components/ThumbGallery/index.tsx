import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import Thumbnail from "./Thumbnail";
import { manifestArray } from "constants/art-manifest";
const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  button {
    display: inline-block;
    font-size: 3rem;
    line-height: 100px;
    color: #999;
    background-color: transparent;
    border: none;
    outline-color: #aaa;
  }

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 1rem;
  }
`;

const ThumbnailList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  justify-content: center;

  @media (max-width: 768px) {
    flex-flow: row wrap;
    justify-content: center;
    gap: 0.5rem;
  }
`;
interface Props {}

export const ThumbGallery: React.FC<Props> = () => {
  const router = useRouter();
  const currentSlug = router.query.slug as string | undefined;

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
              isActive={artwork.slug === currentSlug}
            />
          ))}
      </ThumbnailList>
    </Container>
  );
};
export default ThumbGallery;
