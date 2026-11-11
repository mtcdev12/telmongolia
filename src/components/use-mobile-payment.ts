"use client";

import { useEffect, useState } from "react";

export function useMobilePayment() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Use the device, not viewport width: narrow desktop windows cannot open bank apps.
    setIsMobile(
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  }, []);

  return isMobile;
}
