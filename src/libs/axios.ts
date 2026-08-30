import axios from "axios";
import { nanoid } from "nanoid";

type AxiosServerRequstParams = {
  url: string;
  accessToken: string;
} & (
  | { method?: "get" }
  | {
      method: "post";
      data?: unknown;
    }
);

export async function serverRequest<T>(
  opt: AxiosServerRequstParams,
): Promise<T> {
  const response = await axios(opt.url, {
    method: opt.method || "get",
    headers: {
      "Nav-Consumer-Id": "meroppfolging-frontend",
      "Nav-Call-Id": nanoid(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${opt.accessToken}`,
    },
    ...(opt.method === "post" && { data: opt.data }),
  });

  return response.data;
}
