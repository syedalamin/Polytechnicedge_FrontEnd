"use client";

import { store } from "@/app/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { ApolloClientProvider } from "./ApolloClientProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider>
      <Provider store={store}>
        <Toaster position="top-center" richColors />
        {children}
      </Provider>
    </ApolloClientProvider>
  );
}
