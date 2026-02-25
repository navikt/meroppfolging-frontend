import { StepHandler } from "@/components/Form/StepHandler";
import { senOppfolgingStatus } from "@/server/fetch/senOppfolgingStatus";

export default async function Page() {
  const status = await senOppfolgingStatus();

  return <StepHandler senOppfolgingStatus={status} />;
}
