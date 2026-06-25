"use client";

export function getCookie(name: string): any | null {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));

    if (!cookie) return null;

    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return null;
  }
}
