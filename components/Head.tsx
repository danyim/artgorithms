import NextHead from "next/head";
import React from "react";
import { artgorithmsSimple } from "utils/title";

export const Head = () => (
  <NextHead>
    <title>{artgorithmsSimple}</title>
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
);

export default Head;
