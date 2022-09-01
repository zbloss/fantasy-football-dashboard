import matchups from '/data/matchups.json';


export default function getAllMatchupsData() {
    
    // const { matchups, isLoading, isError } = getDataset('matchups.json')

    // if (isLoading) return []
    // if (isError) return []
    return matchups;
}

export function getMatchupData (id) {

    const allMatchupData = getAllMatchupsData();
    const matchup = allMatchupData[id];
    return {
        id,
        ...matchup
    }
}