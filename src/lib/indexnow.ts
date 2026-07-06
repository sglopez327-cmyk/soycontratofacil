import { INDEXNOW_KEY, SITE_URL } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";
import { getAllPublicPaths } from "@/lib/seo-urls";

export async function notifyIndexNow(): Promise<boolean> {
  const urlList = getAllPublicPaths().map((path) => absoluteUrl(path));

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: absoluteUrl(`/${INDEXNOW_KEY}.txt`),
      urlList,
    }),
  });

  return response.ok || response.status === 202;
}
