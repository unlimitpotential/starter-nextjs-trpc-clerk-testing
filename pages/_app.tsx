import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from '@descope/react-sdk'

import { Roboto } from "@next/font/google";
const projectId = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import "./styles.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ClerkProvider {...pageProps}>          <AuthProvider projectId={projectId || 'DEFAULT_PROJECT_ID'}>
<div>        <Component {...pageProps} /> <ReactQueryDevtools initialIsOpen={false} />  </div>

         </AuthProvider>  
      </ClerkProvider>
    </>
  );
}

export default trpc.withTRPC(App);
