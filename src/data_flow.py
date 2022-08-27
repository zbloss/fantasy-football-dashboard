from metaflow import FlowSpec, Parameter, step

class DataFlow(FlowSpec):

    output_directory = Parameter(
        "output_directory",
        type=str,
        default="data/",
        help="Directory to output all of the files to.",
        required=False,
    )

    league_id = Parameter(
        "league_id", type=int, default=48899928, help="ESPN League Id.", required=False
    )

    @step
    def start(self):
        from datetime import datetime

        from espn_api.football import League

        year = datetime.today().year
        league = League(league_id=self.league_id, year=year)
        self.league = league
        self.next(
            self.get_box_scores,
            self.get_free_agents,
            self.get_standings,
            self.get_rankings,
        )

    @step
    def get_box_scores(self):

        self.box_scores = self.league.box_scores(week=self.league.currentMatchupPeriod)
        self.next(self.get_matchup_data, foreach="box_scores")

    @step
    def get_matchup_data(self):
        from utils import get_team_lineup

        data = {}
        away_team = get_team_lineup(self.input.away_lineup)
        data["away_team"] = away_team
        data["away_score"] = self.input.away_score
        data["away_projected"] = self.input.away_projected

        home_team = get_team_lineup(self.input.home_lineup)
        data["home_team"] = home_team
        data["home_score"] = self.input.home_score
        data["home_projected"] = self.input.home_projected

        data["isPlayoffGame"] = str(self.input.matchup_type).lower() == "none"

        team, score = self.league.least_scored_week()
        data["lowest_scoring_team"] = team.team_name
        data["lowest_scoring_team_score"] = score

        team, score = self.league.top_scored_week()
        data["highest_scoring_team"] = team.team_name
        data["highest_scoring_team_score"] = score
        self.data = data
        self.next(self.join_matchup_data)

    @step
    def join_matchup_data(self, inputs):
        import os

        from utils import json_dump_object_to_file

        matchups = []
        for i in inputs:
            matchups.append(i.data)

        json_dump_object_to_file(
            matchups,
            os.path.join(self.output_directory, "matchups.json"),
        )

        self.next(self.final_join)

    @step
    def get_free_agents(self):

        self.available_free_agents = self.league.free_agents()
        self.next(self.process_free_agents, foreach="available_free_agents")

    @step
    def process_free_agents(self):

        free_agent = {}
        free_agent["name"] = self.input.name
        free_agent["points"] = self.input.points
        free_agent["projectedPoints"] = self.input.projected_points
        free_agent["injuryStatus"] = (
            "-"
            if self.input.injuryStatus == "ACTIVE" or self.input.injuryStatus == []
            else self.input.injuryStatus
        )
        free_agent["position"] = self.input.position
        free_agent["team"] = self.input.proTeam
        free_agent["opponent"] = self.input.pro_opponent
        self.free_agent = free_agent

        self.next(self.join_free_agents)

    @step
    def join_free_agents(self, inputs):
        import pandas as pd

        free_agents = []
        for i in inputs:
            free_agents.append(i.free_agent)

        free_agents = pd.DataFrame(free_agents)
        self.free_agents = free_agents
        self.next(self.create_top_free_agents)

    @step
    def create_top_free_agents(self):
        self.next(
            self.create_top_projected_free_agents, self.create_top_scoring_free_agents
        )

    @step
    def create_top_projected_free_agents(self):

        top_projected_free_agents = (
            self.free_agents.groupby(["position"])
            .apply(lambda x: x.sort_values(["projectedPoints"], ascending=False))
            .reset_index(drop=True)
        )
        top_five_projected_free_agents = top_projected_free_agents.groupby(
            "position"
        ).head(5)
        self.top_five_projected_free_agents = top_five_projected_free_agents.to_dict(
            orient="records"
        )
        self.next(self.join_top_free_agents)

    @step
    def create_top_scoring_free_agents(self):

        top_scoring_free_agents = (
            self.free_agents.groupby(["position"])
            .apply(lambda x: x.sort_values(["points"], ascending=False))
            .reset_index(drop=True)
        )
        top_five_scoring_free_agents = top_scoring_free_agents.groupby("position").head(
            5
        )
        self.top_five_scoring_free_agents = top_five_scoring_free_agents.to_dict(
            orient="records"
        )
        self.next(self.join_top_free_agents)

    @step
    def join_top_free_agents(self, inputs):
        import os

        from utils import json_dump_object_to_file

        json_dump_object_to_file(
            inputs.create_top_projected_free_agents.top_five_projected_free_agents,
            os.path.join(self.output_directory, "top_five_projected_free_agents.json"),
        )

        json_dump_object_to_file(
            inputs.create_top_scoring_free_agents.top_five_scoring_free_agents,
            os.path.join(self.output_directory, "top_five_scoring_free_agents.json"),
        )

        self.next(self.final_join)

    @step
    def get_standings(self):

        self.league_standings = self.league.standings()
        self.next(self.process_standings, foreach="league_standings")

    @step
    def process_standings(self):

        standing = {}
        standing["standing"] = self.input.standing
        standing["team_name"] = self.input.team_name
        standing["wins"] = self.input.wins
        standing["losses"] = self.input.losses
        standing["ties"] = self.input.ties
        standing["logo_url"] = self.input.logo_url
        standing["playoff_pct"] = self.input.playoff_pct
        standing["points_for"] = self.input.points_for
        standing["points_against"] = self.input.points_against

        self.standing = standing
        self.next(self.join_standings)

    @step
    def join_standings(self, inputs):
        import os

        import pandas as pd

        from utils import json_dump_object_to_file

        standings = []
        for i in inputs:
            standings.append(i.standing)

        standings = pd.DataFrame(standings)
        standings["standing"] = standings["standing"].astype(int)
        standings.sort_values(by="standing", ascending=True, inplace=True)
        standings["standing"] = standings["standing"].astype(str)
        standings = standings.to_dict(orient="records")

        json_dump_object_to_file(
            standings,
            os.path.join(self.output_directory, "standings.json"),
        )
        self.next(self.final_join)

    @step
    def get_rankings(self):
        self.league_rankings = self.league.power_rankings()
        self.next(self.process_rankings, foreach="league_rankings")

    @step
    def process_rankings(self):

        score, team = self.input
        power_ranking = {}
        power_ranking["power_ranking"] = score
        power_ranking["team_name"] = team.team_name
        power_ranking["wins"] = team.wins
        power_ranking["losses"] = team.losses
        power_ranking["ties"] = team.ties
        power_ranking["logo_url"] = team.logo_url
        power_ranking["playoff_pct"] = team.playoff_pct
        power_ranking["points_for"] = team.points_for
        power_ranking["points_against"] = team.points_against

        self.power_ranking = power_ranking
        self.next(self.join_power_rankings)

    @step
    def join_power_rankings(self, inputs):
        import os

        import pandas as pd

        from utils import json_dump_object_to_file

        rankings = []
        for i in inputs:
            rankings.append(i.power_ranking)

        power_rankings = pd.DataFrame(rankings)
        power_rankings["power_ranking"] = power_rankings["power_ranking"].astype(float)
        power_rankings.sort_values(by="power_ranking", ascending=False, inplace=True)
        power_rankings["power_ranking"] = power_rankings["power_ranking"].astype(str)
        power_rankings = power_rankings.to_dict(orient="records")
        json_dump_object_to_file(
            power_rankings,
            os.path.join(self.output_directory, "power_rankings.json"),
        )
        self.next(self.final_join)

    @step
    def final_join(self, inputs):
        # inputs.get_box_scores.matchups
        # inputs.get_free_agents.available_free_agents
        self.next(self.end)

    @step
    def end(self):
        pass


if __name__ == "__main__":
    DataFlow()
