import Script from "next/script";

/**
 * Carga gtag de Google Ads solo si hay ID configurado.
 * NEXT_PUBLIC_GOOGLE_ADS_ID = AW-XXXXXXXXX
 * NEXT_PUBLIC_GOOGLE_ADS_SEND_TO = AW-XXXXXXXXX/YYYY (etiqueta de conversión)
 */
export function GoogleAdsTag() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  if (!adsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${adsId}');
        `}
      </Script>
    </>
  );
}
