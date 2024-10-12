import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { ThemeProvider } from "@mui/material"
import { THEME } from "./ui/theme"

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={THEME}>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

