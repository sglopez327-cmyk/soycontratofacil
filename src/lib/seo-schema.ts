import { getAllContractSlugs, getContractBySlug } from "@/lib/contracts";
import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";
import { homeFaqs } from "@/lib/seo-faq";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon.png"),
    email: CONTACT_EMAIL,
    description: DEFAULT_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "España",
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "es-ES",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function homeFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function contractWebPageSchema(slug: string) {
  const contract = getContractBySlug(slug);
  if (!contract) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Generar ${contract.title}`,
    description: contract.description,
    url: absoluteUrl(contract.href),
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: contract.title,
      description: contract.description,
    },
  };
}

export function guideFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function allContractItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Contratos inmobiliarios disponibles",
    numberOfItems: getAllContractSlugs().length,
    itemListElement: getAllContractSlugs().map((slug, index) => {
      const contract = getContractBySlug(slug);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: contract?.title ?? slug,
        url: absoluteUrl(`/generar/${slug}`),
      };
    }),
  };
}
