import Link from 'next/link';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import matchupTable from '../components/matchupTable';
import getAllMatchupsData from '../lib/getMatchupData';


export async function getStaticProps() {
  const allMatchupsData = getAllMatchupsData();
  return {
    props: {
      allMatchupsData    
    },
  };
}


export default function Home({ allMatchupsData }) {

    return (
    <div className='container'>
      <Head>
        <title>Fantasy Football Dashboard</title>
      </Head>

      <div className='row'>
        <div className='col-sm-12'>
          <h1>Fantasy Football Dashboard</h1>
          <p>Welcome to my hobby project where I display fantasy scores for my public ESPN league.</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <h2>This Weeks Matchups!</h2>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          {matchupTable()}
        </div>
      </div>
    </div>
  )
}
