import { useCallback, useEffect, useState } from "react";

const getCurrentTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function useTheme(): "light" | "dark" {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const mediaQueryHandler = useCallback(() => {
    setIsDarkTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    mediaQueryHandler();
  }, [mediaQueryHandler]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", mediaQueryHandler);
    return () => mediaQuery.removeEventListener("change", mediaQueryHandler);
  }, [mediaQueryHandler]);

  return isDarkTheme ? "dark" : "light";
}
