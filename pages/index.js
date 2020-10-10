import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>danyim.co</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>danyim.co</h1>
        <p>hi.</p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
