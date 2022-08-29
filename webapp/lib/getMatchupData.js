import useSWR from 'swr';
import matchups from '../data/matchups.json';


export default function getAllMatchupsData() {
    // const fetcher = (url) => fetch(url).then((res) => res.json());

    // const [ data, error ] = useSWR(
    //     "data/matchups.json",
    //     fetcher
    // );

    // if (error) return "An error has occurred.";
    // if (!data) return "Loading...";

    return matchups;
}

export function getMatchupData (id) {

    const allMatchupData = getAllMatchupsData();
    console.log("allMatchupData: ", allMatchupData);
    const matchup = allMatchupData[id];
    return {
        id,
        ...matchup
    }
}