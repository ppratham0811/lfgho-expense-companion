import {ThemeProvider as NextThemesProvider} from "next-themes";
export default function Provider({children, ...props}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
