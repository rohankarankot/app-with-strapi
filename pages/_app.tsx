import FooterComponent from "@/components/Footer/footer.component"
import HeaderComponent from "@/components/Header/header.component"
import { PersistGate } from "redux-persist/integration/react"
import "@/styles/globals.css"
import { PageTransitionLoader } from "@/utils/PageTransitionLoader"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Provider } from "react-redux"
import { persistor, store } from "@/store/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>app with strapi</title>
        <meta name="description" content="An E commerce Projct Demostraion created using Next JS and Strapi Headless CMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <PageTransitionLoader />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HeaderComponent />
          <Component {...pageProps} />
          <FooterComponent />
        </PersistGate>
      </Provider>
    </>
  )
}
