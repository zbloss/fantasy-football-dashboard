import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import matchupTable from '../components/matchupTable';
import getAllMatchupsData from '../lib/getMatchupData';


export async function getStaticProps() {
  const allMatchupsData = getAllMatchupsData();
  console.log("allMatchupsData: ", allMatchupsData)
  return {
    props: {
      allMatchupsData    
    },
  };
}


export default function Home({ allMatchupsData }) {

  const matchups = matchupTable();

    return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Matchups</h2>
        {matchups}
  
      </section>

    </Layout>
  )
}
