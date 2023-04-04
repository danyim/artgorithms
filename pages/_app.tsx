import { motion } from "framer-motion";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "../styles/globals.css";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

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
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

export default function App({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      transition={spring}
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
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </motion.div>
  );
}
