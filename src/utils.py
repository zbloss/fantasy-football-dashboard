import json
import os


def get_team_lineup(lineup_list: list) -> list:
    """
    Gathers certain fields from either
    `BoxScore.home_lineup` or `BoxScore.away_lineup`
    and returns a single dictionary.

    Arguments:
        lineup_list (list): List of `espn_api.football.box_player.BoxPlayer`.

    Returns:
        list: List of dictionaries of players and their attributes.

    """

    team = []
    for player in lineup_list:
        data = {}
        data["injuryStatus"] = (
            "-" if player.injuryStatus == "ACTIVE" else player.injuryStatus
        )
        data["name"] = player.name
        data["playerId"] = player.playerId
        data["points"] = player.points
        data["projected_points"] = player.projected_points
        data["position"] = (
            "FLEX" if player.slot_position == "RB/WR/TE" else player.slot_position
        )
        team.append(data)
    return team


def json_dump_object_to_file(json_object: list, filepath: str) -> None:
    """
    Helper function that handles the opening, writing, and closing
    of a json object to a file.

    Arguments:
        json_object (list or dict): JSON-serializable object.
        filepath (str): Filepath where you want to write the file to.

    Returns:
        None: None

    """

    (directory_, filepath_) = os.path.split(filepath)
    if not os.path.exists(directory_):
        os.makedirs(directory_)

    with open(filepath, "w") as f:
        f.write(json.dumps(json_object))
        f.close()

    return None
