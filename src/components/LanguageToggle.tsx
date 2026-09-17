"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { ToggleButton } from "@once-ui-system/core";

export const LanguageToggle: React.FC = () => {
  const { locale, toggleLocale } = useLocale();

  return (
    <ToggleButton
      prefixIcon="globe"
      label={locale === "en" ? "ES" : "EN"}
      onClick={toggleLocale}
      aria-label={locale === "en" ? "Cambiar a espanol" : "Switch to English"}
    />
  );
};
