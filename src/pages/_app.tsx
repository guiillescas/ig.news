import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ToastContainer } from 'react-toastify';

import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
