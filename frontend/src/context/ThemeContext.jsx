import { useTheme } from "../hooks/useTheme";
import { ThemeContext } from "./theme";

export function ThemeProvider({ children }) {
  const themeState = useTheme();
  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}
