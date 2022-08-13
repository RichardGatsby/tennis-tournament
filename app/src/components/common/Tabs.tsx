import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import {
  addMatchScore,
  Game,
  getTournamentsMatches,
} from "../../api/matchesApi";
import { LeaderBoardTable } from "../LeaderBoard/LeaderBoardTable";
import { Context } from "../../store";
import { PlayersTable } from "../Players/PlayersTable";
import { MatchesTable } from "../Matches/MatchesTable";
import {
  deleteTournamentsPlayer,
  getTournamentsPlayers,
} from "../../api/tournamentsApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: window.innerWidth < 400 ? 1 : 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function TabContainer() {
  const { state, dispatch } = useContext(Context);
  const { tournamentId } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const [tabIndex, setTabIndex] = useState(0);

  const loadMatches = async () => {
    if (state.selectedTournament) {
      const matches = await getTournamentsMatches(
        state.selectedTournament.tournament_id,
        state.authToken as string
      );
      dispatch({ type: "SET_MATCHES", payload: matches });
    }
  };

  const loadPlayers = async () => {
    if (state.selectedTournament) {
      const players = await getTournamentsPlayers(
        state.authToken as string,
        state.selectedTournament?.tournament_id
      );
      dispatch({ type: "SET_PLAYERS", payload: players });
    }
  };

  const scoreAdded = async (
    firstScore: number,
    secondScore: number,
    selectedMatch: Game
  ) => {
    await addMatchScore(state.authToken as string, selectedMatch.match_id, {
      player_one_score: firstScore,
      player_two_score: secondScore,
      winner_id:
        firstScore === secondScore
          ? undefined
          : firstScore > secondScore
          ? selectedMatch.player_one_id
          : selectedMatch.player_two_id,
    });
    await loadMatches();
  };

  const removePlayer = async (id: number) => {
    await deleteTournamentsPlayer(
      state.authToken as string,
      state.selectedTournament?.tournament_id as number,
      id
    );
    await loadPlayers();
  };

  const updateTabIndex = async (id: number) => {
    setTabIndex(id)
    const params = new URLSearchParams({['tabIndex']: id.toString() });
    navigate({ pathname: location.pathname, search: params.toString() }); 

  };

  useEffect(() => {
    loadMatches();
    loadPlayers();
  }, [state.selectedTournament]);

  useEffect(() => {
    if (tournamentId && state.tournaments.length > 0) {
      const tournament =
        state.tournaments.find(
          (row) => row.tournament_id.toString() === tournamentId
        ) ?? null;
      dispatch({
        type: "SET_SELECTED_TOURNAMENT",
        payload: tournament,
      });
    }
  }, [tournamentId, state.tournaments]);

  useEffect(() => {
    const queryTabIndex = query.get("tabIndex");
    if (queryTabIndex) {
      const tId = parseInt(queryTabIndex);
      if (!isNaN(tId)) {
        setTabIndex(tId);
      }
    }
  }, [query]);

  return (
    <Box sx={{ width: "100%" }}>
      {state.selectedTournament && (
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={(_: any, newValue: number) => updateTabIndex(newValue)}
            >
              <Tab label="Players" {...a11yProps(0)} />
              <Tab label="Matches" {...a11yProps(1)} />
              <Tab label="Leaderboard" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={tabIndex} index={0}>
            <PlayersTable
              players={state.players}
              deletePlayer={removePlayer}
              isAdmin={state.isAdmin}
              matchesCreated={state.matches.length > 0}
              playersEdited={loadPlayers}
            ></PlayersTable>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <MatchesTable
              matches={state.matches}
              scoreAdded={scoreAdded}
            ></MatchesTable>
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <LeaderBoardTable
              players={state.players}
              matches={state.matches}
            ></LeaderBoardTable>
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}
