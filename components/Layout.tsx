import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { ReactNode } from "react";
import ThumbGallery from "./ThumbGallery";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>◬ artgorithms ◍</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        {children}
        <ThumbGallery />
      </main>
    </div>
  );
};

export default Layout;
