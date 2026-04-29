import { BugIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  Button,
  Heading,
  HStack,
  Link,
  List,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { PageBlock } from "@navikt/ds-react/Page";
import NextLink from "next/link";

function NotFound() {
  return (
    <PageBlock as="main" width="xl" gutters>
      <Box paddingBlock="space-24 space-16" data-aksel-template="404-v2">
        <VStack gap="space-24">
          <VStack gap="space-16" align="start">
            <div>
              <Heading level="1" size="large" spacing>
                Beklager, vi fant ikke siden
              </Heading>
              <BodyShort>
                Denne siden kan være slettet eller flyttet, eller det er en feil
                i lenken.
              </BodyShort>
              <List>
                <ListItem>Bruk gjerne søket eller menyen</ListItem>
                <ListItem>
                  <NextLink href="/" className="aksel-link">
                    Gå til forsiden
                  </NextLink>
                </ListItem>
              </List>
            </div>
            <Button as="a" href="https://www.nav.no/minside">
              Gå til Min side
            </Button>
            <Link as="a" href="https://www.nav.no/skriv-til-oss">
              <HStack as="span" gap="space-4" align="center">
                <BugIcon aria-hidden />
                Meld gjerne fra om at lenken ikke virker
              </HStack>
            </Link>
          </VStack>
        </VStack>
      </Box>
    </PageBlock>
  );
}

export default NotFound;
