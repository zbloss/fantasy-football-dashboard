import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Drafts() {

  const leagueId = '1150587'
  const seasonId = '2022'
  const url = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons'

  const finalURL = `${url}/${seasonId}/segments/0/leagues/${leagueId}`

  const { data: matchupData, error: matchupError } = useSWR(`${finalURL}?view=mMatchup`, fetcher)
  console.log("matchupData: ", matchupData)  

  const scoringPeriodId = matchupData ? matchupData.scoringPeriodId : undefined
  const currentMatchups = matchupData ? matchupData.schedule.filter(d => d.matchupPeriodId === scoringPeriodId) : undefined

  console.log("currentMatchups: ", currentMatchups)

  let tableBody = []
  if (currentMatchups !== undefined) {

    for (const [key, matchup] of Object.entries(currentMatchups) ) {

        tableBody.push(<tr key={"table-body-key-" + key}>
            <th scope="row"><Link href={`/matchups/${key}`}>{key}</Link></th>
            <td>{matchup.away.teamId}</td>
            <td>{matchup.away.totalPoints}</td>
            <td>{matchup.home.teamId}</td>
            <td>{matchup.home.totalPoints}</td>
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


  return (
    <div className='container'>
        <div className='row'>
            <div className='col-sm-12'>
                <h1>Matchups Page</h1>
            </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='row'>Matchup</th>
                  <th>Away Team ID</th>
                  <th>Away Team Score</th>
                  <th>Home Team ID</th>
                  <th>Home Team Score</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}