"use client";

export function getCookie(name: string): any | null {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));

    if (!cookie) return null;

    const rawValue = decodeURIComponent(cookie.split("=")[1]);

    if (rawValue.startsWith("j:")) {
      const parsedValue = JSON.parse(rawValue.substring(2));  
     
      return parsedValue;
    }

   
    return rawValue;
  } catch {
    return null;
  }
} 
