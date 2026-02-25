"use client";

import { Box, Heading, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import type { ReactElement } from "react";

import { TrackedExternalLink } from "@/components/Link/TrackedExternalLink";

const NyttigeLenker = (): ReactElement => (
  <Box>
    <Heading size="medium" spacing>
      Informasjon fra Nav som kan være nyttig for deg
    </Heading>

    <Box marginBlock="space-16" asChild>
      <List>
        <ListItem>
          <TrackedExternalLink
            href="https://www.nav.no/syk-lenge"
            openingInNewTabIconInsteadOfText
          >
            Når du har vært syk eller skadet lenge
          </TrackedExternalLink>
        </ListItem>
        <ListItem>
          <TrackedExternalLink
            href="https://www.nav.no/aap"
            openingInNewTabIconInsteadOfText
          >
            Arbeidsavklaringspenger (AAP)
          </TrackedExternalLink>
        </ListItem>
        <ListItem>
          <TrackedExternalLink
            href="https://www.nav.no/friskmelding-arbeidsformidling"
            openingInNewTabIconInsteadOfText
          >
            Friskmelding til arbeidsformidling
          </TrackedExternalLink>
        </ListItem>
        <ListItem>
          <TrackedExternalLink
            href="https://www.nav.no/varig-sykdom-skade#pengestotte"
            openingInNewTabIconInsteadOfText
          >
            Aktuelle pengestøtter når du ikke kan jobbe
          </TrackedExternalLink>
        </ListItem>
      </List>
    </Box>
  </Box>
);

export default NyttigeLenker;
