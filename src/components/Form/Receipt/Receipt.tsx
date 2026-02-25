import { VStack } from "@navikt/ds-react";
import type { ReactElement } from "react";
import MaxDateInfo from "@/components/LandingInfo/MaxDateInfo";
import type {
  BehovForOppfolgingAnswerTypes,
  FremtidigSituasjonAnswerTypes,
} from "@/domain/answerValues";
import type { MaxDateDTO } from "@/server/schemas/sykepengedagerInformasjonSchema";
import HvaSkjerVidereTekst from "./contents/HvaSkjerVidereTekst";
import KontaktInformasjon from "./contents/KontaktInformasjon";
import NyttigeLenker from "./contents/NyttigeLenker";
import OppsummeringAvDineSvar from "./contents/OppsummeringAvDineSvar";
import ThankYouAlert from "./contents/ThankYouAlert";

interface Props {
  fremtidigSituasjonAnswer: FremtidigSituasjonAnswerTypes;
  behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes;
  responseDateISOString: string | null;
  maxDate: MaxDateDTO;
}

function Receipt({
  fremtidigSituasjonAnswer,
  behovForOppfolgingAnswer,
  responseDateISOString,
  maxDate,
}: Props): ReactElement {
  return (
    <VStack gap="space-24">
      <ThankYouAlert responseDateISOString={responseDateISOString} />
      <OppsummeringAvDineSvar
        fremtidigSituasjonAnswer={fremtidigSituasjonAnswer}
        behovForOppfolgingAnswer={behovForOppfolgingAnswer}
      />
      <HvaSkjerVidereTekst
        behovForOppfolgingAnswer={behovForOppfolgingAnswer}
      />
      <MaxDateInfo maxDate={maxDate} />
      <NyttigeLenker />
      <KontaktInformasjon />
      {/*<Flexjar
        feedbackId={`meroppfolging-kvittering-${fremtidigSituasjonAnswer}`}
        sporsmal="Synes du at du har fått nok informasjon om hva som skjer etter at sykepengene tar slutt?"
      />*/}
    </VStack>
  );
}

export default Receipt;
