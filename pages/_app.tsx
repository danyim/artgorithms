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

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
