import axios from "axios";

type AxiosServerRequstParams = {
  url: string;
  accessToken: string;
  callId: string;
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
      "Nav-Call-Id": opt.callId,
      "Content-Type": "application/json",
      Authorization: `Bearer ${opt.accessToken}`,
    },
    ...(opt.method === "post" && { data: opt.data }),
  });

  return response.data;
}
