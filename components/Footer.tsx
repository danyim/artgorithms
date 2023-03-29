import Link from "next/link";
import styles from "@/styles/Home.module.css";
import React from "react";

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <div className={styles.footer}>
      a project by&nbsp;<a href="https://daniely.im">@danyim</a>
    </div>
  );
};

export default Footer;
