"use client";

 
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { ApolloClientProvider } from "./ApolloClientProvider";
import { store } from "@/app/store";

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
