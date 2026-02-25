import { BodyShort } from "@navikt/ds-react";
import type { ReactElement } from "react";
import { TrackedExternalLink } from "@/components/Link/TrackedExternalLink";
import AlleredeSoktOmPengestotteExpansionCard from "@/components/UI/AlleredeSoktOmPengestotteExpansionCard";

export const TilbakeGradert = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det
        hende at du har rett på{" "}
        <TrackedExternalLink href="https://www.nav.no/aap">
          arbeidsavklaringspenger (AAP)
        </TrackedExternalLink>
        , eller en annen økonomisk støtte.
      </BodyShort>

      <AlleredeSoktOmPengestotteExpansionCard />
    </>
  );
};
