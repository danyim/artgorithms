import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
    };
    breakpoints: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
