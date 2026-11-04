"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Currency } from "@/lib/types";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
};

const STORAGE_KEY = "av:currency";

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage(STORAGE_KEY, "UF");

  const currency: Currency =
    stored === "CLP" || stored === "UF" || stored === "USD" ? stored : "UF";

  const setCurrency = useCallback(
    (c: Currency) => setStored(c),
    [setStored],
  );

  const toggleCurrency = useCallback(() => {
    setStored(currency === "UF" ? "CLP" : "UF");
  }, [currency, setStored]);

  const value = useMemo(
    () => ({ currency, setCurrency, toggleCurrency }),
    [currency, setCurrency, toggleCurrency],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency debe usarse dentro de CurrencyProvider");
  return ctx;
}
