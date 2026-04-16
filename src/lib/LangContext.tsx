"use client";
import React, { createContext, useContext, useState } from "react";

type Lang = "en" | "es";
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  T: (obj: { en: string; es: string }) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  T: (o) => o.en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const T = (obj: { en: string; es: string }) => obj[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, T }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
