import "./globals.css";
import { Theme } from "@navikt/ds-react";
import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { configureLogger } from "@navikt/next-logger";
import type { Metadata } from "next";
import Script from "next/script";
import type React from "react";
import { Providers } from "@/app/providers";
import { MerOppfolgingPageLayout } from "@/components/Page/MerOppfolgingPageLayout";
import { BASE_PATH } from "@/constants/appConstants";
import { publicEnv } from "@/constants/envs";

configureLogger({
  basePath: BASE_PATH,
});

function createDecoratorEnv(): "dev" | "prod" {
  switch (publicEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
    case "local":
    case "test":
    case "dev":
      return "dev";
    default:
      return "prod";
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Decorator = await fetchDecoratorReact({
    env: createDecoratorEnv(),
    params: {
      language: "nb",
      context: "privatperson",
      logoutWarning: true,
      chatbot: true,
      feedback: false,
      redirectToApp: true,
    },
  });

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
      </head>
      <body>
        <Theme theme="light">
          <Decorator.Header />
          <Providers>
            <MerOppfolgingPageLayout footer={<Decorator.Footer />}>
              {children}
            </MerOppfolgingPageLayout>
          </Providers>
          <Decorator.Scripts loader={Script} />
        </Theme>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Registering av mer oppfølging",
};
