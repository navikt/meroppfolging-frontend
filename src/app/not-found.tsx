'use client'

import { ReactElement } from 'react'
import { BodyShort, Box, Button, Heading, List, Page, VStack } from '@navikt/ds-react'
import Link from 'next/link'

function NotFound(): ReactElement {
  return (
    <Page.Block as="main" width="xl" gutters>
      <Box paddingBlock="20 16" data-aksel-template="404-v2">
        <VStack gap="16">
          <VStack gap="12" align="start">
            <div>
              <Heading level="1" size="large" spacing>
                Beklager, vi fant ikke siden
              </Heading>
              <BodyShort>Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.</BodyShort>
              <List>
                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                <List.Item>
                  <Link href="#">Gå til forsiden</Link>
                </List.Item>
              </List>
            </div>
            <Button as="a" href="https://www.nav.no/minside">
              Gå til Min side
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Page.Block>
  )
}

export default NotFound
