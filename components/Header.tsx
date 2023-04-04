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
      <p>
        <i>merging algorithms with art</i>
      </p>
    </div>
  );
};

export default Header;
