import Head from 'next/head';
import Image from 'next/image'
import { getMatchupData } from '../../lib/getMatchupData';
import getAllMatchupsData from '../../lib/getMatchupData';

import TeamStartersTable from '../../components/teamStartersTable';
import TeamBenchTable from '../../components/teamBenchTable';


export default function Matchup({ matchupData }) {
    

    return (
      <>
        <Head>
          <title>{matchupData.id}</title>
        </Head>

        <div className='container'>
            <div className='row'>
                <div className='col-md-3 col-sm-12'></div>
                <div className='col-md-6 col-sm-12'><h1>Matchup Time!</h1></div>
                <div className='col-md-3 col-sm-12'></div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <hr />
                </div>
            </div>
            <div className='row'>

                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-8'>
                        <h2>(#{matchupData.home_team_standing}) {matchupData.home_team_name}</h2>
                    </div>
                    <div className='col-sm-4'>
                        <Image
                            src={`${matchupData.home_team_logo}`} 
                            alt="Home Team Logo"
                            width={150}
                            height={150}
                            className='img img-responsive'
                        />
                    </div>
                </div>
                <div className='col-md-6 col-sm-12'>
                    <div className='col-sm-8'>
                        <h2>(#{matchupData.away_team_standing}) {matchupData.away_team_name}</h2>
                    </div>
                    <div className='col-sm-4'>
                        <Image
                            src={`${matchupData.away_team_logo}`}  
                            alt="Away Team Logo"
                            width={150}
                            height={150}
                            className='img img-responsive'
                        />
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    {matchupData.home_team !== undefined ? TeamStartersTable(matchupData.home_team) : <></>}
                </div>
                <div className='col-md-6 col-sm-12'>
                    {matchupData.away_team !== undefined ? TeamStartersTable(matchupData.away_team) : <></>}
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    {matchupData.home_team !== undefined ? TeamBenchTable(matchupData.home_team) : <></>}
                    
                </div>
                <div className='col-md-6 col-sm-12'>
                    {matchupData.away_team !== undefined ? TeamBenchTable(matchupData.away_team) : <></>}
                </div>
            </div>
        </div>

      </>
    );
}
    
export function getStaticPaths() {
    const matchups = getAllMatchupsData();
    const paths = []
    matchups.forEach( (matchup, index) => {
        paths.push({
            params: { id: index.toString() }
        })
    })

    return {
        paths,
      fallback: false,
    };
}

export function getStaticProps({ params }) {
    const matchupData = getMatchupData(params.id);
    return {
      props: {
        matchupData,
      },
    };
}