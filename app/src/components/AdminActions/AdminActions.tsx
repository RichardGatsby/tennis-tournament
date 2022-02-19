import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { addTournament, endTournament } from "../../api/tournamentsApi";
import { Player } from "../../api/playersApi";
import Button from "@mui/material/Button";
import { Context } from "../../store";

import {
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addMatches } from "../../api/matchesApi";

export default function AdminActions() {
  const { state, dispatch } = useContext(Context);

  const [openAddTournament, setOpenAddTournament] = useState<boolean>(false);
  const [tournamentName, setTournamentName] = useState<string | null>(null);

  const handleAddTournament = async () => {
    if (tournamentName) {
      await addTournament(state.authToken as string, {
        name: tournamentName,
        tournament_type: "round-robin",
      });
      handleAddTournamentClose();
    }
  };
  const handleAddTournamentClose = () => {
    setOpenAddTournament(false);
    setTournamentName(null);
  };

  const createMatches = async (players: Player[]) => {
    const matches = players.flatMap((v, i) =>
      players.slice(i + 1).map((w) => ({
        player_one_id: v.player_id,
        player_two_id: w.player_id,
        match_type: "group-stage",
        tournament_id: state.selectedTournament?.tournament_id,
      }))
    );
    await addMatches(state.authToken as string, matches);
  };

  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Admin Tools
        </Typography>
        <Button
          onClick={async () => setOpenAddTournament(true)}
          variant="outlined"
          sx={{ margin: "4px" }}
          >
          Create Tournament
        </Button>

        {state.selectedTournament && (
          <>
            <Button
              disabled={
                !state.selectedTournament?.end_dt ||
                state.players.length < 2 ||
                state.matches.length > 0
              }
              onClick={async () => createMatches(state.players)}
              variant="outlined"
              sx={{ margin: "4px" }}
            >
              Create Matches
            </Button>
            <Button
              disabled={state.selectedTournament?.end_dt !== null}
              onClick={async () => {
                if (
                  state.selectedTournament &&
                  !state.selectedTournament.end_dt
                )
                  await endTournament(
                    state.authToken as string,
                    state.selectedTournament.tournament_id
                  );
              }}
              variant="outlined"
              sx={{ margin: "4px" }}
            >
              End tournament
            </Button>
          </>
        )}
      </CardContent>

      <Dialog open={openAddTournament} onClose={handleAddTournamentClose}>
        <DialogTitle>Add tournament</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name for the tournament
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            variant="standard"
            onChange={(event) => setTournamentName(event.target.value)}
            value={tournamentName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTournamentClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddTournament} variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
