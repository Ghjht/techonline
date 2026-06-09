const LOGO_KEY = "techit_logo";

export function getLogo(): string {
  try { return localStorage.getItem(LOGO_KEY) || ""; } catch { return ""; }
}

export function setLogo(url: string) {
  localStorage.setItem(LOGO_KEY, url);
}

export function removeLogo() {
  localStorage.removeItem(LOGO_KEY);
}
