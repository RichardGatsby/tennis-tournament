import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getTournaments, Tournament } from "../../api/tournamentsApi";

export default function TournamentSelector() {
  const { state, dispatch } = useContext(Context);
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    number | null
  >(null);

  const loadTournaments = async () => {
    const tournaments = await getTournaments(state.authToken as string);
    dispatch({ type: "SET_TOURNAMENTS", payload: tournaments });
  };

  const handleTournamentChange = (event: any) => {
    const tournament =
      state.tournaments.find(
        (row) => row.tournament_id === event.target.value
      ) ?? null;
    dispatch({
      type: "SET_SELECTED_TOURNAMENT",
      payload: tournament,
    });
  };
  useEffect(() => {
    setSelectedTournamentId(state?.selectedTournament?.tournament_id ?? null);
  }, [state.selectedTournament]);
  return (
    <Box sx={{ width: "100%" }}>
      {!state.selectedTournament && (
        <Box>
          <FormControl fullWidth>
            <InputLabel id="select-tournament-label">
              Select tournament
            </InputLabel>
            <Select
              labelId="select-tournament-label"
              id="select-tournament"
              value={selectedTournamentId}
              onChange={handleTournamentChange}
            >
              {state.tournaments.map((tournament) => (
                <MenuItem
                  value={tournament.tournament_id}
                  key={tournament.tournament_id}
                >
                  {tournament.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {state.selectedTournament && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Tournament: {state.selectedTournament.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Start date: {state.selectedTournament.start_dt}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              End date: {state.selectedTournament.end_dt}
            </Typography>
            <Button
              sx={{ float: "right" }}
              onClick={() =>
                dispatch({
                  type: "SET_SELECTED_TOURNAMENT",
                  payload: null,
                })
              }
            >
              close
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
