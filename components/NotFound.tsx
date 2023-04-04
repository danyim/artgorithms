import React from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";

interface Props {}

export const NotFound: React.FC<Props> = () => {
  const router = useRouter();
  let { slug } = router.query;

  return (
    <div>
      <h1>Nothing here</h1>
      <p>
        "{slug}" is not a part of this gallery. Choose one of the works below:
      </p>
    </div>
  );
};

export default NotFound;
