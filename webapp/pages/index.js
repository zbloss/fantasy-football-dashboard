import Link from 'next/link';
import Head from 'next/head';
import matchupTable from '../components/matchupTable';
import getAllMatchupsData from '../lib/getMatchupData';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export async function getStaticProps() {

  const allMatchupsData = getAllMatchupsData();
  return {
    props: {
      allMatchupsData    
    },
  };
}


export default function Home({ allMatchupsData }) {

  const leagueId = '1150587'
  const seasonId = '2022'
  const url = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons'

  const { data, error } = useSWR(`${url}/${seasonId}/segments/0/leagues/${leagueId}`, fetcher)
  console.log("data: ", data)

  return (
    <div className='container'>
      <Head>
        <title>Fantasy Football Dashboard</title>
      </Head>

      <div className='row'>
        <div className='col-sm-12'>
          {data ? <figure className='text-center'>
            <h1>League: <small className='text-muted'>{data.settings.name}</small></h1> 
            <h1>Season: <small className='text-primary'>{data.seasonId}</small></h1>  
          </figure>
          : <></>}
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <h1 className='text-primary'>League Members</h1>
          {data ? 
            <table className='table table-striped'>
              <thead>
                <tr><th>Members</th></tr>
              </thead>
              <tbody>
                {data.members.map((member, index) => {
                  return (
                    <tr key={index}>
                      <td>{member.displayName}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          : <></>}
        </div>
      </div>


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
