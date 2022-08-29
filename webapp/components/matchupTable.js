import Link from 'next/link';
import getAllMatchupsData from '../lib/getMatchupData';    
export default function matchupTable () {

    const data = getAllMatchupsData()

    let tableBody = []
    if (data !== undefined) {

        for (const [key, value] of Object.entries(data) ) {
                    
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