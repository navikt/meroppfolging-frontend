"use client";

import { configureLogger } from "@navikt/next-logger";
import type React from "react";
import { BASE_PATH } from "@/constants/appConstants";
import { initFaro } from "@/libs/faro/faro";

configureLogger({
  basePath: BASE_PATH,
});

initFaro();

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return children;
};
