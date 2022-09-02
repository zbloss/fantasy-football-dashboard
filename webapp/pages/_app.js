import 'bootstrap/dist/css/bootstrap.css'
import '../styles/scss/global.scss'
import Head from "next/head";
import Navbar from '../components/navbar';

function App({ Component, pageProps }) {
    return (<>
        <Head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />        
        </Head>
        <Navbar></Navbar><br />
        <Component {...pageProps} /> 
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous"></script>
    </>);
}
export default App;