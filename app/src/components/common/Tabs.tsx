import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { addMatchScore, Game, getMatches } from "../../api/matchesApi";
import { LeaderBoardTable } from "../LeaderBoard/LeaderBoardTable";
import { Context } from "../../store";
import { PlayersTable } from "../Players/PlayersTable";
import { MatchesTable } from "../Matches/MatchesTable";
import {
  deleteTournamentsPlayer,
  getTournaments,
  getTournamentsPlayers,
} from "../../api/tournamentsApi";
import AdminActions from "../AdminActions/AdminActions";
import TournamentSelector from "../TournamentSelector/TournamentSelector";

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
          <Typography>{children}</Typography>
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

export default function TabContainer() {
  const { state, dispatch } = useContext(Context);
  const [value, setValue] = useState(0);

  const loadData = async () => {
    await loadTournaments();
    await loadPlayers();
    await loadMatches();
  };

  const loadMatches = async () => {
    if (state.selectedTournament) {
      const matches = await getMatches(
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

  const loadTournaments = async () => {
    const tournaments = await getTournaments(state.authToken as string);
    dispatch({ type: "SET_TOURNAMENTS", payload: tournaments });
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
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

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadMatches();
    loadPlayers();
  }, [state.selectedTournament]);

  return (
    <Box sx={{ width: "100%" }}>
      {state.isAdmin && <AdminActions />}
      <TournamentSelector />
      {state.selectedTournament && (
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Players" {...a11yProps(0)} />
              <Tab label="Matches" {...a11yProps(1)} />
              <Tab label="Leaderboard" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PlayersTable
              players={state.players}
              deletePlayer={removePlayer}
              isAdmin={state.isAdmin}
              matchesCreated={state.matches.length > 0}
            ></PlayersTable>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MatchesTable
              matches={state.matches}
              scoreAdded={scoreAdded}
            ></MatchesTable>
          </TabPanel>
          <TabPanel value={value} index={2}>
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
