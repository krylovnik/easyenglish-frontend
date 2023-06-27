import '@/styles/globals.css'
import '@/styles/normalize.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {store} from "@/src/store/store";
import AuthProvider from "@/src/providers/auth-provider/AuthProvider";
import {TypeComponentAuthFields} from "@/src/providers/auth-provider/auth-page.types";




export default function App({ Component, pageProps }: AppProps & TypeComponentAuthFields) {
  return(
        <Provider store={store}>
            <AuthProvider Component={{isOnlyUser: Component.isOnlyUser}}>
                <Component {...pageProps} />
            </AuthProvider>
        </Provider>
  )}
