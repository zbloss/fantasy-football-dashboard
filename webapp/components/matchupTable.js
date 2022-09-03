import Link from 'next/link';
import getAllMatchupsData from '../lib/getMatchupData';    
import useSWR from 'swr';
import * as dfd from "danfojs"
import { DataFrame,  } from 'danfojs/dist/danfojs-base';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function matchupTable () {

    const leagueId = '1150587'
    const seasonId = 2022
    const url = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons'

    const finalURL = `${url}/${seasonId}/segments/0/leagues/${leagueId}`

    const { data: matchupData, error: matchupError } = useSWR(`${finalURL}?view=mMatchup`, fetcher)
    console.log("matchupData: ", matchupData)  

    const scoringPeriodId = matchupData ? matchupData.scoringPeriodId : undefined
    const currentMatchups = matchupData ? matchupData.schedule.filter(d => d.matchupPeriodId === scoringPeriodId) : undefined
    console.log("currentMatchups: ", currentMatchups)


    const { data: rosterData, error: teamError } = useSWR(`${finalURL}?view=mRoster`, fetcher)
    console.log("rosterData: ", rosterData)


    if (currentMatchups !== undefined && rosterData !== undefined) {
        // dfd.readJSON(rosterData).then((df) => {
        //     df.print()
        // })
    
        currentMatchups.forEach((matchup) => {

            let winner = matchup.winner
            
            let home_team = matchup.home
            let home_team_id = home_team.teamId
            let home_team_score = home_team.totalPoints
            let home_team_roster = rosterData.teams.filter((item) => item.id === home_team_id)

            home_team_roster[0].roster.entries.forEach((player) => {
                player.playerPoolEntry.player.stats.forEach((stat) => {
                    if (stat.seasonId === seasonId && stat.scoringPeriodId === scoringPeriodId) {
                        if (stat.statSourceId === 0) {
                            let player_stats = stat
                            console.log("player_stats: ", player_stats)
                        } else {
                            let player_projected_stats = stat
                            console.log("player_projected_stats: ", player_projected_stats)
                        }
                    }
                })
            })


            let away_team = matchup.away
            let away_team_id = away_team.teamId
            let away_team_score = away_team.totalPoints
            let away_team_roster = rosterData.teams.filter((item) => item.id === away_team_id)


        
        })
    }



    const data = getAllMatchupsData()

    let tableBody = []
    if (currentMatchups !== undefined) {

        for (const [key, value] of Object.entries(currentMatchups) ) {
                    
            tableBody.push(<tr key={"table-body-key-" + key}>
                <th scope="row"><Link href={`/matchups/${key}`}>{key}</Link></th>
                <td>{value['away_projected']}</td>
                <td>{value['away_score']}</td>
                <td>{value['home_projected']}</td>
                <td>{value['home_score']}</td>
            </tr>)
        }
    } else {
        tableBody.push(<tr key="table-body-key-empty">
            <th scope="row">-</th>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>)
    }
    return (<>
        <table className='table'>
            <thead>
                <tr>
                    <th>Matchup #</th>
                    <th>Away Projected</th>
                    <th>Away Score</th>
                    <th>Home Projected</th>
                    <th>Home Score</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </table>
    </>)
}