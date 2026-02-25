import { BodyLong, Heading, Stack, VStack } from "@navikt/ds-react";
import Image from "next/image";
import type { ReactNode } from "react";

import pageErrorDad from "./Images/error-page-dad.svg";
import notFoundMom from "./Images/not-found-mom.svg";

interface Props {
  graphic?: "dad" | "mom";
  text?: string;
  details?: ReactNode;
  action?: ReactNode | null;
}

const PageError = ({ graphic = "dad", text, details }: Props): JSX.Element => {
  const errorText = text ?? "Beklager! Det har oppstått en uventet feil";

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      gap={{ xs: "space-24", lg: "space-32" }}
      align={{ xs: "center", lg: "start" }}
      maxWidth="48rem"
      role="status"
      aria-live="polite"
    >
      {graphic === "dad" ? (
        <Image
          src={pageErrorDad}
          alt=""
          width={320}
          height={240}
          style={{ maxHeight: 240 }}
        />
      ) : (
        <Image
          src={notFoundMom}
          alt=""
          width={320}
          height={240}
          style={{ maxHeight: 240 }}
        />
      )}
      <VStack gap="space-8" align="start">
        <Heading size="large" level="1">
          Oops!
        </Heading>
        <Heading size="small" level="2">
          {errorText}
        </Heading>
        {details ?? (
          <BodyLong>
            Sannsynligvis jobber vi med saken allerede, men ta kontakt med oss
            hvis det ikke har løst seg til i morgen.
          </BodyLong>
        )}
      </VStack>
    </Stack>
  );
};

export default PageError;
