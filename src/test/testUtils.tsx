import {
  type RenderOptions,
  render,
  type Screen,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import open from "open";
import type { ReactElement, ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { FormInputs } from "@/components/Form/StepHandler";

type CustomRenderReturnType = {
  user: ReturnType<typeof userEvent.setup>;
} & ReturnType<typeof render>;

const AllTheProviders = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const methods = useForm<FormInputs>();

  return (
    <MemoryRouterProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </MemoryRouterProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): CustomRenderReturnType => {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

export async function openPlayground(screen: Screen): Promise<void> {
  await open(screen.logTestingPlaygroundURL());
}

const customScreen = {
  ...screen,
  openPlayground: () => openPlayground(screen),
};

export { customRender as render, customScreen as screen };
