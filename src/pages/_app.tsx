import { type AppType } from "next/app";
import { api } from "npm/utils/api";
import { ClerkProvider } from "@clerk/nextjs";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
  </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
