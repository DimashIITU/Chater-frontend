import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '../components/Header';

import { wrapper } from '../redux/store';
import { setUserData } from '../redux/slices/user';

import { Api } from '../utils/api';

import '../styles/globals.scss';

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  try {
    const data = await Api(ctx).user.getMe();

    store.dispatch(setUserData(data));
    const props = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      ...data,
    };
    return {
      pageProps: props,
    };
  } catch (error) {
    if (ctx.asPath !== '/') {
      if (ctx.asPath !== '/403') {
        ctx.res?.writeHead(302, {
          location: '/403',
        });
        ctx.res?.end();
      }
    }
    console.warn(error);
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
  };
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className="wrapper">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {router.pathname !== '/' && router.pathname !== '/403' ? <Header /> : null}
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(App);
