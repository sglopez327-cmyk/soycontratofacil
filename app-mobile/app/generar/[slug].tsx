import { useLocalSearchParams } from "expo-router";

import { ContractTemplate } from "@/components/contracts/ContractTemplate";

export default function GenerarContratoScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const contractSlug = typeof slug === "string" ? slug : "";

  return <ContractTemplate slug={contractSlug} />;
}
