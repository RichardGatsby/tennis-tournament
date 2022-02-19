import { useContext, useEffect, useState } from "react";
import { addPlayer, getPlayers, Player } from "../../api/playersApi";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Context } from "../../store";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addTournamentsPlayer } from "../../api/tournamentsApi";
interface PlayersTableProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const AddPlayerDialog = ({ isOpen, handleClose }: PlayersTableProps) => {
  const { state, dispatch } = useContext(Context);
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const loadPlayers = async () => {
    const players = await getPlayers(state.authToken as string);
    setPlayers(players);
  };
  const handleChange = (event: any) => {
    setSelectedPlayerId(event.target.value as number);
  };
  const handleSavePlayer = async () => {
    //TODO: this is atm a bit hacky since we check if theres a selection and save that and if not then add the new player with the name :))
    if (selectedPlayerId) {
      //TODO: cleanup the as
      await addTournamentsPlayer(
        state.authToken as string,
        state.selectedTournament?.tournament_id as number,
        { player_id: selectedPlayerId as number }
      );
    } else {
      if (name) {
        const player = await addPlayer(state.authToken as string, { name });
        await addTournamentsPlayer(
          state.authToken as string,
          state.selectedTournament?.tournament_id as number,
          { player_id: player.player_id }
        );
      }
    }
    handleClose();
  };
  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <Container>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add player to the tournament</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="demo-simple-select-label">Select player</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedPlayerId}
              label="Select player"
              onChange={handleChange}
            >
              {players.map((player) => (
                <MenuItem value={player.player_id} key={player.player_id}>{player.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {!selectedPlayerId && (
            <DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Add a new player"
                type="text"
                variant="standard"
                onChange={(event) => setName(event.target.value)}
                value={name}
                fullWidth
              />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSavePlayer} variant="outlined">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
