import { useState, useEffect } from "react";
import StartingPositionOrder from '../constants/starting_position_order';

export default function TeamStartersTable (teamPlayers) {

    const [score, setScore] = useState(0);
    const [projectedScore, setProjectedScore] = useState(0);
    const [starters, setStarters] = useState([]);

    useEffect(() => {

        let tmpScore = 0;
        let tmpProjectedScore = 0;
        let tmpStarters = [];
        teamPlayers.map((player) => {
            if (Object.keys(StartingPositionOrder).includes(player.position)) {
                tmpStarters.push(player)
                tmpScore += Number(player.points)
                tmpProjectedScore += Number(player.projected_points)
            }
        })

        setScore(Math.round(tmpScore * 100) / 100);
        setProjectedScore(Math.round(tmpProjectedScore * 100) / 100);
        setStarters(
            tmpStarters.sort((a, b) => StartingPositionOrder[b.position] - StartingPositionOrder[a.position])
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
            {starters ? starters.map((player, idx) => {
                return (
                    <tr key={idx}>
                        <td>{player.position}</td>
                        <td>{player.name}</td>
                        <td>{player.injuryStatus === '-' ? <></> : <p>[{player.injuryStatus}]</p>}</td>
                        <td>{player.points} ({player.projected_points})</td>
                    </tr>
                )
            }) : <></>}
            <tr>
                <td><b>Total Points</b></td>
                <td></td>
                <td></td>
                <td><b>{score}</b> ({projectedScore})</td>
            </tr>
            </tbody>
        </table>
    )
}