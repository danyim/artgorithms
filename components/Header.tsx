import Link from "next/link";
import styles from "@/styles/Home.module.css";
import React from "react";
import { artgorithmsStyled } from "utils/title";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <div className={styles.header}>
      <h1>
        <Link href="/">{artgorithmsStyled}</Link>
      </h1>
      <p>merging algorithms with art</p>{" "}
      {/* <p>
        every piece depicted here is programmatically generated to match the
        actual work(s).
      </p> */}
    </div>
  );
};

export default Header;
