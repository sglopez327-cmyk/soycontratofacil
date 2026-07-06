import { getAllArticleSlugs, getArticleBySlug } from "@/lib/seo-articles";
import { getAllGuideSlugs, getGuideBySlug } from "@/lib/seo-guides";
import { getGuideSlugForContract } from "@/lib/seo-guide-relations";
import { getAllContractSlugs, getContractBySlug } from "@/lib/contracts";
import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";
import { homeFaqs } from "@/lib/seo-faq";
import type { SeoArticle } from "@/lib/seo-articles";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon-192.png"),
    image: absoluteUrl("/og-image.png"),
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

/** Enlaces internos para crawlers sin cambiar el diseño visible. */
export function siteNavigationSchema() {
  const mainRoutes = [
    { name: "Inicio", path: "/" },
    { name: "Guías", path: "/guias" },
    { name: "Artículos", path: "/articulos" },
    { name: "Sobre nosotros", path: "/sobre-nosotros" },
    { name: "Aviso legal", path: "/aviso-legal" },
    { name: "Privacidad", path: "/privacidad" },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Navegación principal",
    itemListElement: mainRoutes.map((route, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: route.name,
      url: absoluteUrl(route.path),
    })),
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

  const guideSlug = getGuideSlugForContract(slug);
  const relatedGuideUrl = guideSlug
    ? absoluteUrl(`/guias/${guideSlug}`)
    : undefined;

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
    ...(relatedGuideUrl ? { relatedLink: relatedGuideUrl } : {}),
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

export function articleSchema(article: SeoArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "es-ES",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon-192.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/articulos/${article.slug}`),
    image: absoluteUrl("/og-image.png"),
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

export function guidesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guías de contratos inmobiliarios",
    numberOfItems: getAllGuideSlugs().length,
    itemListElement: getAllGuideSlugs().map((slug, index) => {
      const guide = getGuideBySlug(slug);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: guide?.title ?? slug,
        url: absoluteUrl(`/guias/${slug}`),
      };
    }),
  };
}

export function articlesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Artículos sobre contratos inmobiliarios",
    numberOfItems: getAllArticleSlugs().length,
    itemListElement: getAllArticleSlugs().map((slug, index) => {
      const article = getArticleBySlug(slug);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: article?.title ?? slug,
        url: absoluteUrl(`/articulos/${slug}`),
      };
    }),
  };
}
