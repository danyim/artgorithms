import NextHead from "next/head";
import React from "react";
import { artgorithmsStyled } from "utils/title";

export const Head = () => (
  <NextHead>
    <title>{artgorithmsStyled}</title>
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
);

export default Head;
