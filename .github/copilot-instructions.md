# meroppfolging-frontend

```sh
pnpm dev
pnpm test --run
pnpm lint
pnpm build
```

`mise run verify` runs fixing commands and can change files.

- Keep redirects and frontend URLs under `publicEnv.NEXT_PUBLIC_BASE_PATH`.
- `src/constants/envs.ts` owns validated environment values and
  `isLocalOrDemo`. Only local/demo may use fixture status/maksdato or skip
  actual form submission.
- Maksdato and senoppfølging call different backends and use different
  TokenX audiences. Keep their separate exchange helpers in `src/auth/tokenUtils.ts`.
- Preserve `?isoformat=true` on the maksdato call; the response schema expects
  that date representation.
- Use `fetchValidatedJson` for the existing backend response/error contract.
  Error logging keeps allowlisted fields from `runtimeErrorContract` and
  numeric upstream status; raw Axios/fetch errors can expose form data and
  tokens and must not be serialized.
