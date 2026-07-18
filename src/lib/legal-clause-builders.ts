/**
 * Cláusulas legales derivadas de datos del formulario (España).
 */

export function buildClausulaDesistimientoVivienda(preavisoDiasRaw: string): string {
  const parsed = Number(preavisoDiasRaw);
  const dias = Number.isFinite(parsed) && parsed > 0 ? Math.max(30, Math.floor(parsed)) : 30;

  return (
    "De conformidad con el artículo 11 de la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (LAU), " +
    "EL ARRENDATARIO podrá desistir del contrato una vez transcurridos al menos seis (6) meses desde el inicio de su vigencia, " +
    `siempre que lo comunique de forma fehaciente a EL ARRENDADOR con una antelación mínima de ${dias} días. ` +
    "Las partes pactan expresamente que, en caso de desistimiento, EL ARRENDATARIO indemnizará a EL ARRENDADOR " +
    "con una cantidad equivalente a una mensualidad de la renta en vigor por cada año de contrato que reste por cumplir, " +
    "prorrateándose los periodos inferiores al año. " +
    "La resolución anticipada por parte de EL ARRENDADOR solo procederá por las causas legalmente admitidas " +
    "(en particular, artículos 9.3 y 27 de la LAU) o por mutuo acuerdo escrito de las partes."
  );
}

export function buildClausulaEfectosArras(tipoRaw: string): string {
  const tipo = tipoRaw.trim().toLowerCase();

  if (tipo === "penitenciales" || tipo.includes("penitencial")) {
    return (
      "Las arras tienen carácter penitencial a los efectos del artículo 1.454 del Código Civil. " +
      "Si EL COMPRADOR desistiere del contrato, perderá la cantidad entregada en concepto de arras. " +
      "Si EL VENDEDOR desistiere, deberá restituir a EL COMPRADOR el duplo de dicha cantidad. " +
      "Fuera de estos supuestos de desistimiento, las arras se imputarán al precio de la compraventa " +
      "en el momento del otorgamiento de la escritura pública."
    );
  }

  if (tipo === "penales" || tipo.includes("penal")) {
    return (
      "Las arras tienen carácter penal. En caso de incumplimiento imputable a una de las partes, " +
      "la parte cumplidora podrá optar entre exigir el cumplimiento del contrato o su resolución, " +
      "con indemnización de daños y perjuicios, sirviendo la cantidad entregada en concepto de arras " +
      "como cuantificación convencional de la penalidad, sin perjuicio de lo que resulte aplicable " +
      "conforme a los artículos 1.152 y siguientes del Código Civil. " +
      "Si la compraventa se perfecciona, las arras se imputarán al precio."
    );
  }

  // confirmatorias (default doctrinal when tipo unclear)
  return (
    "Las arras tienen carácter confirmatorio del contrato de compraventa. " +
    "La cantidad entregada se imputará al precio en el otorgamiento de la escritura pública. " +
    "En caso de incumplimiento, la parte cumplidora podrá exigir el cumplimiento forzoso del contrato " +
    "o su resolución, con indemnización de los daños y perjuicios que procedan conforme al Código Civil, " +
    "sin que la mera entrega de arras limite tales acciones a la pérdida o al duplo de la señal, " +
    "salvo pacto distinto expresamente documentado."
  );
}

export function buildTextoFormaPago(formaRaw: string): string {
  switch (formaRaw.trim()) {
    case "contado":
      return (
        "al contado, mediante el pago íntegro del precio en el acto del otorgamiento de la escritura pública " +
        "de compraventa, salvo cantidades ya entregadas a cuenta que se imputarán al precio"
      );
    case "hipoteca":
      return (
        "mediante financiación hipotecaria que EL COMPRADOR se obliga a gestionar de buena fe. " +
        "El precio se abonará en el acto de la escritura con cargo a la disposición del préstamo y, en su caso, " +
        "con fondos propios de EL COMPRADOR. La denegación definitiva de financiación no imputable a EL COMPRADOR " +
        "podrá dar lugar a la resolución del presente contrato en los términos que las partes acuerden por escrito"
      );
    case "mixta":
      return (
        "de forma mixta: con las cantidades entregadas a cuenta o en concepto de arras, que se imputarán al precio, " +
        "y el resto mediante financiación hipotecaria y/o fondos propios en el otorgamiento de la escritura pública"
      );
    default:
      return formaRaw.trim() || "conforme acuerden las partes por escrito";
  }
}

export function fianzaMesesRecomendados(slug: string): 1 | 2 | null {
  switch (slug) {
    case "vivienda":
      return 1;
    case "temporada":
    case "local":
    case "arrendamiento-garaje":
      return 2;
    case "habitacion":
      return 1;
    default:
      return null;
  }
}
