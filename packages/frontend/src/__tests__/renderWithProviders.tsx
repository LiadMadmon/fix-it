import { ReactNode } from "react";
import { AppProviders } from "../AppProviders";
import { render } from "@testing-library/react";

export const renderWithProviders = (children: ReactNode) => {
  return render(<AppProviders>{children}</AppProviders>);
};
