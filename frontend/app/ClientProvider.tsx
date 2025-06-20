"use client";

import { Provider } from "react-redux";
import { store } from "../lib/redux/store";

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
