import { BodyShort, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import type { ReactElement } from "react";

import { TrackedExternalLink } from "@/components/Link/TrackedExternalLink";

export const BytteJobb = (): ReactElement => {
  return (
    <>
      <List>
        <ListItem>
          Er det vanskelig for deg å utføre oppgavene du hadde før du ble syk?
        </ListItem>
        <ListItem>
          Er det andre forhold hos arbeidsgiveren din som gjør det vanskelig for
          deg å fungere i jobben?
        </ListItem>
      </List>
      <BodyShort>
        Av og til fungerer man bedre i en annen jobb enn den man er sykmeldt
        fra. Det nærmer seg slutten på sykepengene dine, og derfor kan det være
        lurt å tenke på å bytte jobb allerede nå.
      </BodyShort>
      <BodyShort>
        Hvis du blir arbeidsledig eller permittert kan du ha rett på{" "}
        <TrackedExternalLink href="https://www.nav.no/dagpenger">
          dagpenger
        </TrackedExternalLink>
        .
      </BodyShort>
    </>
  );
};
