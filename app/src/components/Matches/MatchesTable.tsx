import { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Game } from "../../api/matchesApi";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { getComparator, Order, stableSort } from "../../utils/tableSorters";
import { Context } from "../../store";
interface MatchesTableProps {
  matches: Game[];
  scoreAdded: (
    firstScore: number,
    secondScore: number,
    selectedMatch: Game
  ) => void;
}
export const MatchesTable = ({ matches, scoreAdded }: MatchesTableProps) => {
  const { state, dispatch } = useContext(Context);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Game>("match_id");

  const [selectedMatch, setSelectedMatch] = useState<Game | null>(null);
  //OK IM LAZY
  const [firstScore, setFirstScore] = useState<number | null>(null);
  const [secondScore, setSecondScore] = useState<number | null>(null);

  const handleSave = async () => {
    if (selectedMatch && firstScore !== null && secondScore !== null)
      await scoreAdded(firstScore, secondScore, selectedMatch);
    handleClose();
  };
  const handleClose = () => {
    setSelectedMatch(null);
    setFirstScore(null);
    setSecondScore(null);
  };

  const handleRequestSort = (property: keyof Game) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  interface SortButtonProps {
    property: keyof Game;
    order: Order;
    onClick: (property: keyof Game) => void;
  }
  const SortButton = ({ property, order, onClick }: SortButtonProps) => {
    return orderBy === property && order === "asc" ? (
      <span style={{ cursor: "pointer" }} onClick={() => onClick(property)}>
        ↑
      </span>
    ) : (
      <span style={{ cursor: "pointer" }} onClick={() => onClick(property)}>
        ↓
      </span>
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Match id
              <SortButton
                property="match_id"
                order={order}
                onClick={handleRequestSort}
              />
            </TableCell>
            <TableCell>
              Player one
              <SortButton
                property="player_one_name"
                order={order}
                onClick={handleRequestSort}
              />
            </TableCell>
            <TableCell>
              Player two
              <SortButton
                property="player_two_name"
                order={order}
                onClick={handleRequestSort}
              />
            </TableCell>
            <TableCell>Player one score</TableCell>
            <TableCell>Player two score</TableCell>
            <TableCell>Add score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(matches, getComparator(order, orderBy)).map((match) => (
            <TableRow
              key={match.match_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {match.match_id}
              </TableCell>
              <TableCell
                className={
                  match.winner === match.player_one_id
                    ? "green-color"
                    : undefined
                }
              >
                {match.player_one_name}
              </TableCell>
              <TableCell
                className={
                  match.winner === match.player_two_id
                    ? "green-color"
                    : undefined
                }
              >
                {match.player_two_name}
              </TableCell>
              <TableCell>{match.player_one_score}</TableCell>
              <TableCell>{match.player_two_score}</TableCell>
              <TableCell>
                <Button
                  disabled={state.selectedTournament?.end_dt !== null}
                  style={{ padding: 0 }}
                  onClick={() => setSelectedMatch(match)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!selectedMatch} onClose={handleClose}>
        <DialogTitle>Set scores</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="player_one_score"
            label={selectedMatch?.player_one_name + " score"}
            type="number"
            variant="standard"
            onChange={(event) =>
              setFirstScore(parseInt(event.target.value) ?? null)
            }
            value={firstScore}
          />
          <TextField
            autoFocus
            margin="dense"
            id="player_twoe_score"
            label={selectedMatch?.player_two_name + " score"}
            type="number"
            variant="standard"
            onChange={(event) =>
              setSecondScore(parseInt(event.target.value) ?? null)
            }
            value={secondScore}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};
