import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import {
  addMatches,
  addMatchScore,
  Game,
  getMatches,
  removeAllMatches,
} from "../../api/matchesApi";
import {
  addPlayer,
  deletePlayer,
  getPlayers,
  Player,
} from "../../api/playersApi";
import { LeaderBoardTable } from "../LeaderBoard/LeaderBoardTable";
import Button from "@mui/material/Button";
import { Context } from "../../store";
import { PlayersTable } from "../Players/PlayersTable";
import { MatchesTable } from "../Matches/MatchesTable";

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
    await loadPlayers();
    await loadMatches();
  };

  const loadMatches = async () => {
    const matches = await getMatches(state.authToken as string);
    dispatch({ type: "SET_MATCHES", payload: matches });
  };

  const loadPlayers = async () => {
    const players = await getPlayers(state.authToken as string);
    dispatch({ type: "SET_PLAYERS", payload: players });
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const createMatches = async (players: Player[]) => {
    const matches = players.flatMap((v, i) =>
      players.slice(i + 1).map((w) => ({
        player_one_id: v.player_id,
        player_two_id: w.player_id,
        match_type: "group-stage",
      }))
    );
    await addMatches(state.authToken as string, matches);
    await loadMatches();
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

  const createPlayer = async (name: string) => {
    await addPlayer(state.authToken as string, { name });
    await loadPlayers();
  };

  const removePlayer = async (id: number) => {
    await deletePlayer(state.authToken as string, id);
    await loadPlayers();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {state.isAdmin && (
        <Box bgcolor={"#D3D3D3"}>
          Admin actions
          <Button
            disabled={state.players.length < 2 || state.matches.length > 0}
            onClick={async () => createMatches(state.players)}
          >
            Create Matches
          </Button>
          <Button
            disabled={state.matches.length === 0}
            onClick={async () => {
              await removeAllMatches(state.authToken as string);
              await loadMatches();
            }}
          >
            Clear Matches
          </Button>
        </Box>
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Players" {...a11yProps(0)} />
          <Tab label="Matches" {...a11yProps(1)} />
          <Tab label="Leaderboard" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Button onClick={loadData}>Refresh Tables</Button>
      <TabPanel value={value} index={0}>
        <PlayersTable
          players={state.players}
          addPlayer={createPlayer}
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
  );
}
