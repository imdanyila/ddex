import { type AppType } from "next/app";
import { api } from "npm/utils/api";
import { ClerkProvider, RedirectToSignIn, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import "../styles/globals.css";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <>
       <SignedIn>
          <Component {...pageProps} />
       </SignedIn>
       <SignedOut>
          <RedirectToSignIn />
       </SignedOut>
      </>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
