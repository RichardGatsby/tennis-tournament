import { useState } from "react";
import { Player } from "../../api/playersApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface PlayersTableProps {
  players: Player[];
  isAdmin: boolean;
  matchesCreated: boolean;
  addPlayer: (name: string) => void;
  deletePlayer: (id: number) => void;
}
export const PlayersTable = ({
  players,
  isAdmin,
  matchesCreated,
  addPlayer,
  deletePlayer,
}: PlayersTableProps) => {
  const [name, setName] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = async () => {
    if (name) {
      await addPlayer(name);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName(null);
  };

  return (
    <Container>
      {!matchesCreated && (
        <Button onClick={() => setOpen(true)}>Add player</Button>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.player_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" width={"15%"}>
                  {player.player_id}
                </TableCell>
                <TableCell>{player.name}</TableCell>
                {isAdmin && !matchesCreated && (
                  <TableCell
                    onClick={() => deletePlayer(player.player_id)}
                  >
                    Delete
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name and press save to add a player
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            variant="standard"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
