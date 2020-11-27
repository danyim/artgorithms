import { motion } from "framer-motion";
import { ThemeProvider } from "styled-components";
import "../styles/globals.css";

const theme = {
  colors: {
    primary: "#0070f3",
  },
  breakpoints: {
    small: "450px",
    medium: "650px",
    large: "950px",
  },
};

export default function App({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
        pageExit: {
          opacity: 0,
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </motion.div>
  );
}
