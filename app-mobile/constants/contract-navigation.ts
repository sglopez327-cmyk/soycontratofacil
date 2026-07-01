import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

import { getContractWebUrl } from "@/constants/config";
import { isNativeContract } from "@/lib/native-contract-registry";

/** Abre el contrato en flujo nativo o web según el registro de migración. */
export function openContract(slug: string): void {
  if (isNativeContract(slug)) {
    router.push(`/generar/${slug}`);
    return;
  }

  void WebBrowser.openBrowserAsync(getContractWebUrl(slug));
}
