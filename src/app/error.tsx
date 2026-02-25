"use client";

import React, { useEffect } from "react";
import { logger } from "@navikt/next-logger";
import Image from "next/image";
import pageErrorDad from "@/components/ErrorBoundary/Images/error-page-dad.svg";
import { BodyLong, Button, Heading, Stack, VStack } from "@navikt/ds-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  const errorText = "Beklager! Det har oppstått en uventet feil";

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      gap={{ xs: "space-24", lg: "space-32" }}
      align={{ xs: "center", lg: "start" }}
      maxWidth="48rem"
      role="status"
      aria-live="polite"
    >
      <Image
        src={pageErrorDad}
        alt=""
        width={320}
        height={240}
        style={{ maxHeight: 240 }}
      />

      <VStack gap="space-24" align="start">
        <VStack gap="space-8" align="start">
          <Heading size="large" level="1">
            Oops!
          </Heading>
          <Heading size="small" level="2">
            {errorText}
          </Heading>
          <BodyLong>
            Sannsynligvis jobber vi med saken allerede, men ta kontakt med oss
            hvis det ikke har løst seg til i morgen.
          </BodyLong>
        </VStack>

        <Button variant="primary" onClick={() => reset()}>
          Klikk her for å prøve igjen
        </Button>
      </VStack>
    </Stack>
  );
}
