import styled from "styled-components";
import Link from "next/link";

const ListItem = styled.li`
  margin: 0 1rem;
  height: 100px;
  width: 100px;
  cursor: pointer;

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
`;

const FlexContainer = styled.div<{ thumbnailPath: string }>`
  display: flex;
  border-radius: 10px;
  background-color: #c0c0c0;
  width: 100%;
  height: 100%;
  background-image: ${({ thumbnailPath }) => `url('${thumbnailPath}')`};
`;

const replaceDash = (str: string) => str?.replace("-", " ") ?? str;

interface Props {
  slug: string;
  href: string;
}

export const Thumbnail = ({ href, slug }: Props) => {
  return (
    <Link href={href}>
      <ListItem title={slug}>
        <FlexContainer thumbnailPath={`/thumb/${slug}.png`}></FlexContainer>
        <label>{replaceDash(slug)}</label>
      </ListItem>
    </Link>
  );
};
export default Thumbnail;
