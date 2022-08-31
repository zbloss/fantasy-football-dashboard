import 'bootstrap/dist/css/bootstrap.css'
import '../styles/scss/global.scss'
import Head from "next/head";
import Navbar from '../components/navbar';

function App({ Component, pageProps }) {
    return (<>
        <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar></Navbar><br />
        <Component {...pageProps} /> 
    </>);
}
export default App;  