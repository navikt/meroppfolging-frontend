"use client";

import { BodyShort, Button, Heading, Stack, VStack } from "@navikt/ds-react";
import { logger } from "@navikt/next-logger";
import Image from "next/image";
import { type ReactElement, useEffect } from "react";
import pageErrorDad from "@/components/ErrorBoundary/Images/error-page-dad.svg";
import { NavPhoneNumber } from "@/components/UI/NavPhoneNumber";
import WriteToUsLink from "@/components/UI/WriteToUsLink";
import { useLogAnalyticsEvent } from "@/libs/analytics/analytics";

function NoAccessInformation(): ReactElement {
  const logMessage =
    "User visited SenOppfolging page, but does not have access. Showing 'You cannot access form' page.";
  useLogAnalyticsEvent({ eventName: "besøk" }, { info: logMessage });
  useEffect(() => {
    logger.warn(logMessage);
  }, [logMessage]);

  return (
    <VStack
      gap="space-32"
      align="start"
      paddingBlock={{ md: "space-80 space-64" }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap="space-24"
        align={{ xs: "center", md: "start" }}
      >
        <Image width={202} height={240} src={pageErrorDad} alt="" />
        <VStack gap="space-16" align="start">
          <Heading level="1" size="large">
            Beklager, du kan ikke svare på dette skjemaet nå.
          </Heading>
          <BodyShort>
            Dette skjemaet er ikke åpnet for deg. Skjemaet skal være åpnet
            dersom du er sykmeldt og nærmer deg slutten på perioden du kan motta
            sykepenger, og du har fått et varsel som lenker hit.
          </BodyShort>
          <BodyShort>
            Hvis du mener det har skjedd en feil, prøv igjen senere. Hvis feilen
            vedvarer, ta kontakt med oss på tlf. <NavPhoneNumber /> eller på{" "}
            <WriteToUsLink /> (åpner i ny fane).
          </BodyShort>
        </VStack>
      </Stack>
      <Button as="a" href="https://www.nav.no/minside">
        Gå til Min side
      </Button>
    </VStack>
  );
}

export default NoAccessInformation;
