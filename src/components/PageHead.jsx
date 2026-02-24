import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO por ruta: title, meta description y canonical.
 * Uso: <PageHead title="..." description="..." path="/contact" />
 */
export default function PageHead({ title, description, path = "" }) {
  const siteName = " | INIT";
  const fullTitle = title.endsWith(siteName) || title.endsWith("INIT") ? title : title + siteName;
  const canonical =
    typeof window !== "undefined" && path
      ? `${window.location.origin}${path}`
      : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
