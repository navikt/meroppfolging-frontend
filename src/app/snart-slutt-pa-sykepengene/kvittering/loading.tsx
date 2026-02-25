import { Skeleton, VStack } from "@navikt/ds-react";
import type { ReactElement } from "react";
import HvaSkjerVidereTekst from "@/components/Form/Receipt/contents/HvaSkjerVidereTekst";
import KontaktInformasjon from "@/components/Form/Receipt/contents/KontaktInformasjon";
import NyttigeLenker from "@/components/Form/Receipt/contents/NyttigeLenker";
import OppsummeringAvDineSvar from "@/components/Form/Receipt/contents/OppsummeringAvDineSvar";
import ThankYouAlert from "@/components/Form/Receipt/contents/ThankYouAlert";
import MaxDateInfo from "@/components/LandingInfo/MaxDateInfo";

export default function Loading(): ReactElement {
  return (
    <VStack gap="space-24">
      <Skeleton>
        <ThankYouAlert responseDateISOString={""} />
      </Skeleton>
      <Skeleton>
        <OppsummeringAvDineSvar
          fremtidigSituasjonAnswer={"TILBAKE_HOS_ARBEIDSGIVER"}
          behovForOppfolgingAnswer={"JA"}
        />
      </Skeleton>
      <Skeleton>
        <HvaSkjerVidereTekst behovForOppfolgingAnswer={"JA"} />
      </Skeleton>
      <Skeleton variant="rounded">
        <MaxDateInfo
          maxDate={{
            maxDate: new Date().toISOString(),
            gjenstaendeSykedager: "60",
            utbetaltTom: new Date().toISOString(),
          }}
        />
      </Skeleton>
      <NyttigeLenker />
      <KontaktInformasjon />
    </VStack>
  );
}
