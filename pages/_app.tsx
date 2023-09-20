import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/context/AppContext";
import { NextComponentType } from "next/types";
import { ProtectedRoute } from "@/components/shared/layouts";

type AuthAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AuthAppProps) {
  return (
    <>
      <AppProvider>
        <div className="bg-secondary min-h-screen">
          <QueryClientProvider client={queryClient}>
            {Component.auth ? (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            ) : (
              <Component {...pageProps} />
            )}
          </QueryClientProvider>
        </div>
      </AppProvider>
    </>
  );
}
