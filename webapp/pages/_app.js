import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";

function App({ Component, pageProps }) {
    return (<>
        <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} /> 
    </>);
}
export default App;  