import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image'
import { getMatchupData } from '../../lib/getMatchupData';
import getAllMatchupsData from '../../lib/getMatchupData';


export default function Matchup({ matchupData }) {
    
    const [homeScore, setHomeScore] = useState(0);
    const [projectedHomeScore, setProjectedHomeScore] = useState(0);
    const [homeStarters, setHomeStarters] = useState([]);
    const [homeBench, setHomeBench] = useState([]);

    const [awayScore, setAwayScore] = useState(0);
    const [projectedAwayScore, setProjectedAwayScore] = useState(0);
    const [awayStarters, setAwayStarters] = useState([]);
    const [awayBench, setAwayBench] = useState([]);

    const sort_position_order = {
        "QB": 7,
        "RB": 6,
        "WR": 5,
        "TE": 4,
        "FLEX": 3,
        "D/ST": 2,
        // "BE": 1,
        // "IR": 0
    }

    const bench_positions = {
        "BE": 1,
        "IR": 0
    }

    useEffect(() => {
        let tmp_home_score = 0;
        let tmp_projected_home_score = 0;
        let tmp_home_starters = []
        let tmp_home_bench_spots = []
        matchupData.home_team.map((player) => {
            if (Object.keys(sort_position_order).includes(player.position)) {
                tmp_home_starters.push(player)
                tmp_home_score += Number(player.points)
                tmp_projected_home_score += Number(player.projected_points)
            } else {
                tmp_home_bench_spots.push(player)
            }
        })

        setHomeScore(Math.round(tmp_home_score * 100) / 100);
        setProjectedHomeScore(Math.round(tmp_projected_home_score * 100) / 100);
        setHomeStarters(
            tmp_home_starters.sort((a, b) => sort_position_order[b.position] - sort_position_order[a.position])
        )
        setHomeBench(
            tmp_home_bench_spots.sort((a, b) => bench_positions[b.position] - bench_positions[a.position])
        )

        let tmp_away_score = 0;
        let tmp_projected_away_score = 0;
        let tmp_away_starters = []
        let tmp_away_bench_spots = []
        matchupData.away_team.map((player) => {
            if (Object.keys(sort_position_order).includes(player.position)) {
                tmp_away_starters.push(player)
                tmp_away_score += Number(player.points)
                tmp_projected_away_score += Number(player.projected_points)
            } else {
                tmp_away_bench_spots.push(player)
            }
        })
        setAwayScore(Math.round(tmp_away_score * 100) / 100);
        setProjectedAwayScore(Math.round(tmp_projected_away_score * 100) / 100);
        setAwayStarters(
            tmp_away_starters.sort((a, b) => sort_position_order[b.position] - sort_position_order[a.position])
        )
        setAwayBench(
            tmp_away_bench_spots.sort((a, b) => bench_positions[b.position] - bench_positions[a.position])
        )
        
    }, [matchupData]);


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
                        />
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Player</th>
                                <th></th>
                                <th>Score (Projected)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {homeStarters.map((player) => {
                            return (
                                <tr>
                                    <td>{player.position}</td>
                                    <td>{player.name}</td>
                                    <td>{player.injuryStatus === '-' ? <></> : <p>[{player.injuryStatus}]</p>}</td>
                                    <td>{player.points} ({player.projected_points})</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td><b>Total Points</b></td>
                            <td></td>
                            <td></td>
                            <td><b>{homeScore}</b> ({projectedHomeScore})</td>
                        </tr>
                        </tbody>
                    </table>
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
                        />
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Player</th>
                                <th> </th>
                                <th>Score (Projected)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {awayStarters.map((player) => {
                            return (
                                <tr>
                                    <td>{player.position}</td>
                                    <td>{player.name}</td>
                                    <td>{player.injuryStatus === '-' ? <></> : <p>[{player.injuryStatus}]</p>}</td>
                                    <td>{player.points} ({player.projected_points})</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td><b>Total Points</b></td>
                            <td></td>
                            <td></td>
                            <td><b>{awayScore}</b> ({projectedAwayScore})</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    <table className='table'>
                        <tbody>
                        {homeBench.map((player) => {
                            return (
                                <tr>
                                    <td>{player.position}</td>
                                    <td>{player.name}</td>
                                    <td>{player.injuryStatus === '-' ? <></> : <p>[{player.injuryStatus}]</p>}</td>
                                    <td>{player.points} ({player.projected_points})</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className='col-md-6 col-sm-12'>
                    <table className='table'>
                        <tbody>
                        {awayBench.map((player) => {
                            return (
                                <tr>
                                    <td>{player.position}</td>
                                    <td>{player.name}</td>
                                    <td>{player.injuryStatus === '-' ? <></> : <p>[{player.injuryStatus}]</p>}</td>
                                    <td>{player.points} ({player.projected_points})</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
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
    console.log("paths: ", paths)
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