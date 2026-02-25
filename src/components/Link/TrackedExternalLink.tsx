"use client";

import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Link } from "@navikt/ds-react";
import type { ReactElement } from "react";

import { logAnalyticsEvent } from "@/libs/analytics/analytics";

interface Props {
  href: string;
  openingInNewTabIconInsteadOfText?: boolean;
  children: string;
}

export const TrackedExternalLink = ({
  href,
  openingInNewTabIconInsteadOfText = false,
  children,
}: Props): ReactElement => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        logAnalyticsEvent({
          eventName: "navigere",
          data: {
            lenketekst: children,
            destinasjon: href,
          },
        });
      }}
      inlineText
    >
      {openingInNewTabIconInsteadOfText ? (
        <>
          <span className="mr-1">{children}</span>
          <ExternalLinkIcon title="åpner i ny fane" />
        </>
      ) : (
        <>{children} (åpner i ny fane)</>
      )}
    </Link>
  );
};
