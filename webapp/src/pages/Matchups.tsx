import React, { useState, useEffect } from 'react';

import matchupsData from '../data/matchups.json';

export const Matchups = () => {

    const [data, setData] = useState(matchupsData);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <h1>Matchups Page</h1>
                </div>
                <div className='col-sm-12'>
                <table className='table'>
                    <tbody><>
                        <tr>
                            <th scope="col">Away Projected</th>
                            <th scope="col">Away Score</th>
                            <th scope="col">Home Projected</th>
                            <th scope="col">Home Score</th>
                        </tr>
                        {data.forEach( (e, index) => {
                            <tr key={index}>
                                <td>{e.away_score.toString()}</td>
                                <td>{e.away_projected.toString()}</td>
                                <td>{e.home_score.toString()}</td>
                                <td>{e.home_projected.toString()}</td>
                            </tr>
                        } )}                    
                    </></tbody>
                </table>
                </div>
            </div>

        </div>
    );
}

export default Matchups;