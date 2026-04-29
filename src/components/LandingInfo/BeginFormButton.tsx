"use client";

import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import NextLink from "next/link";
import type { ReactElement } from "react";
import { logAnalyticsEvent } from "@/libs/analytics/analytics";

export const BeginFormButton = (): ReactElement => {
  return (
    <div>
      <Button
        as={NextLink}
        href="/snart-slutt-pa-sykepengene/skjema"
        icon={<ArrowRightIcon aria-hidden />}
        iconPosition="right"
        onClick={() => {
          logAnalyticsEvent({
            eventName: "skjema startet",
            data: {
              skjemanavn: "Snart slutt på sykepengene",
            },
          });
        }}
      >
        Gå videre
      </Button>
    </div>
  );
};
