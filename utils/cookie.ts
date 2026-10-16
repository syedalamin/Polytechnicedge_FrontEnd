"use client";

export interface LoginData {
  role?: string;
  [key: string]: unknown;
}

export function getCookie(name: string): LoginData | null {
  if (typeof document === "undefined") return null;
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));

    if (!cookie) return null;

    const rawValue = decodeURIComponent(cookie.split("=")[1]);

    if (rawValue.startsWith("j:")) {
      const parsedValue = JSON.parse(rawValue.substring(2));

      return parsedValue as LoginData;
    }

    return rawValue as unknown as LoginData;
  } catch {
    return null;
  }
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}
