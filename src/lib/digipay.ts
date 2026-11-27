export function getDigiPayPaymentLink(invoice: Record<string, unknown>) {
  if (invoice.payment_method !== "digipay" || typeof invoice.deeplink !== "string") {
    return null;
  }

  const match = /^digipay:\/\/payment\/([a-z0-9_.-]{1,128})$/i.exec(invoice.deeplink);
  if (!match || match[0] !== invoice.deeplink || match[1] !== String(invoice.invoice_id)) {
    return null;
  }

  return `digipay://payment/${match[1]}`;
}

export function tryDigiPayHandoff(link: string) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!isMobile || navigator.userActivation?.isActive === false) return;

  // Browsers may require another tap after an asynchronous invoice request.
  try {
    window.location.assign(link);
  } catch {
    // The invoice dialog keeps the payment link available for a direct tap.
  }
}
