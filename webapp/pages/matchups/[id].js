import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image'
import { getMatchupData } from '../../lib/getMatchupData';
import getAllMatchupsData from '../../lib/getMatchupData';


export default function Matchup({ matchupData }) {
    
    const [homeScore, setHomeScore] = useState(0);
    const [projectedHomeScore, setProjectedHomeScore] = useState(0);

    const [awayScore, setAwayScore] = useState(0);
    const [projectedAwayScore, setProjectedAwayScore] = useState(0);
    

    const sort_position_order = {
        "QB": 6,
        "RB": 5,
        "WR": 4,
        "TE": 3,
        "FLEX": 2,
        "D/ST": 1,
        "BE": 0
    }


    const home_players = matchupData.home_team.sort((a, b) => sort_position_order[b.position] - sort_position_order[a.position])
    const away_players = matchupData.away_team.sort((a, b) => sort_position_order[b.position] - sort_position_order[a.position])


    useEffect(() => {
        let tmp_home_score = 0;
        let tmp_projected_home_score = 0;
        home_players.map((player) => {
            if (player.position !== "BE") {
                tmp_home_score += Number(player.points)
                tmp_projected_home_score += Number(player.projected_points)
            }
        })
        setHomeScore(Math.round(tmp_home_score * 100) / 100);
        setProjectedHomeScore(Math.round(tmp_projected_home_score * 100) / 100);

        let tmp_away_score = 0;
        let tmp_projected_away_score = 0;
        away_players.map((player) => {
            if (player.position !== "BE") {
                tmp_away_score += Number(player.points)
                tmp_projected_away_score += Number(player.projected_points)
            }
        })
        setAwayScore(Math.round(tmp_away_score * 100) / 100);
        setProjectedAwayScore(Math.round(tmp_projected_away_score * 100) / 100);
        
    }, [home_players, away_players]);


    return (
      <>
        <Head>
          <title>{matchupData.id}</title>
        </Head>

        <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <h1>Matchup Time!</h1>
                </div>
            </div>
            <div className='row'>

                <div className='col-md-6 col-sm-12'>
                    <h2>(#{matchupData.home_team_standing}) {matchupData.home_team_name}</h2>
                    <Image
                        src={`${matchupData.home_team_logo}`} 
                        alt="Home Team Logo"
                        width={150}
                        height={150}
                    />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Player</th>
                                <th>Score (Projected)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {home_players.map((player) => {
                            return (
                                <tr>
                                    <td>{player.position}</td>
                                    <td>{player.name} {player.injuryStatus === '-' ? <></> : player.injuryStatus}</td>
                                    <td>{player.points} ({player.projected_points})</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td><b>Total Points</b></td>
                            <td>-</td>
                            <td>{homeScore} ({projectedHomeScore})</td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <div className='col-md-6 col-sm-12'>
                    <h2>(#{matchupData.away_team_standing}) {matchupData.away_team_name} VS</h2>
                    <Image
                        src={`${matchupData.away_team_logo}`}  
                        alt="Away Team Logo"
                        width={150}
                        height={150}
                    />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Player</th>
                                <th>Score (Projected)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {away_players.map((player) => {
                            return (
                                <tr>
                                    <td>{player.position}</td>
                                    <td>{player.name} {player.injuryStatus === '-' ? <></> : player.injuryStatus}</td>
                                    <td>{player.points} ({player.projected_points})</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td><b>Total Points</b></td>
                            <td>-</td>
                            <td>{awayScore} ({projectedAwayScore})</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </>
    );
}
    
export async function getStaticPaths() {
    const matchups = getAllMatchupsData();
    const paths = []
    matchups.forEach( (matchup, index) => {
        paths.push({
            params: { id: index.toString() }
        })
    })
    console.log("paths: ", paths)
    return {
        paths,
      fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const matchupData = await getMatchupData(params.id);
    return {
      props: {
        matchupData,
      },
    };
}