"use client";

import { ReactNode } from "react";
import { useLocale } from "@/contexts/LocaleContext";

interface LocaleSwitchProps {
  en: ReactNode;
  es: ReactNode;
}

export function LocaleSwitch({ en, es }: LocaleSwitchProps) {
  const { locale } = useLocale();
  return <>{locale === "es" ? es : en}</>;
}
