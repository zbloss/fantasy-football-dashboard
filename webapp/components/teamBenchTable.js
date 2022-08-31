import { useState, useEffect } from "react";
import BenchPositionOrder from '../constants/bench_position_order';

export default function TeamBenchTable (teamPlayers) {

    const [players, setPlayers] = useState([]);

    useEffect(() => {

        let tmpPlayers = [];
        teamPlayers.map((player) => {
            if (Object.keys(BenchPositionOrder).includes(player.position)) {
                tmpPlayers.push(player)
            }
        })

        setPlayers(
            tmpPlayers.sort((a, b) => BenchPositionOrder[b.position] - BenchPositionOrder[a.position])
        )

    }, [teamPlayers]);

    return (
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
            {players ? players.map((player, idx) => {
                return (
                    <tr key={idx}>
                        <td>{player.position}</td>
                        <td>{player.name}</td>
                        <td>{player.injuryStatus === '-' ? <></> : <p>[{player.injuryStatus}]</p>}</td>
                        <td>{player.points} ({player.projected_points})</td>
                    </tr>
                )
            }) : <></>}
            </tbody>
        </table>
    )
}