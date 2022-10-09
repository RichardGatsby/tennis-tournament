import Box from "@mui/material/Box";
import { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function TournamentSelector() {
  const { state, dispatch } = useContext(Context);
  const [selectedTournamentId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleTournamentChange = (event: any) => {
    const tournament =
      state.tournaments.find(
        (row) => row.tournament_id === event.target.value
      ) ?? null;
    dispatch({
      type: "SET_SELECTED_TOURNAMENT",
      payload: tournament,
    });
    navigate(`/tournaments/${tournament?.tournament_id}`);
  };
  const closeTournament = () => {
    dispatch({
      type: "SET_SELECTED_TOURNAMENT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!state.selectedTournament &&
        state.tournaments &&
        state.tournaments.length > 0 && (
          <Box>
            <FormControl fullWidth>
              <InputLabel id="select-tournament-label">
                Select tournament
              </InputLabel>
              <Select
                labelId="select-tournament-label"
                id="select-tournament"
                value={selectedTournamentId ?? ""}
                onChange={handleTournamentChange}
              >
                {state.tournaments?.map((tournament) => (
                  <MenuItem
                    value={tournament.tournament_id}
                    key={tournament.tournament_id}
                  >
                    <Typography>{tournament.name}</Typography>
                    {tournament.end_dt && (
                      <Typography
                        color={"red"}
                        paddingLeft="10px"
                      >{`ended ${new Date(
                        tournament.end_dt
                      ).toDateString()}`}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      {state.selectedTournament && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box>
              <Box>
                <Typography variant="h5" component="div">
                  Tournament: {state.selectedTournament.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Start date:
                  {new Date(state.selectedTournament.start_dt).toDateString() ??
                    ""}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  End date:
                  {state.selectedTournament.end_dt &&
                    new Date(state.selectedTournament.end_dt).toDateString()}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={closeTournament} variant="outlined">
                  close
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
