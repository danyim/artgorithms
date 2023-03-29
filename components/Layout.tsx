import styles from "@/styles/Home.module.css";
import React, { ReactNode } from "react";
import ThumbGallery from "./ThumbGallery";
import Head from "./Head";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head />

      <main className={styles.main}>
        <Header />
        {children}
        <ThumbGallery />
      </main>
    </div>
  );
};

export default Layout;
