"use client";

import { useEffect } from "react";
import { getLogo } from "@/data/settingsStore";

export default function FaviconSetter() {
  useEffect(() => {
    const logo = getLogo();
    if (!logo) return;
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logo;
  }, []);

  return null;
}
