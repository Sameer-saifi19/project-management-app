"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
