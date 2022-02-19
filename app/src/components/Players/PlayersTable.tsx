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
import { AddPlayerDialog } from "./AddPlayerDialog";

interface PlayersTableProps {
  players: Player[];
  isAdmin: boolean;
  matchesCreated: boolean;
  deletePlayer: (id: number) => void;
}
export const PlayersTable = ({
  players,
  isAdmin,
  matchesCreated,
  deletePlayer,
}: PlayersTableProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container>
      {!matchesCreated && (
        <Button onClick={() => setIsOpen(true)}>Add player</Button>
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
                  <TableCell onClick={() => deletePlayer(player.player_id)}>
                    Delete
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddPlayerDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </Container>
  );
};
