import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Game } from "../../api/matchesApi";
import { Player } from "../../api/playersApi";
import {
  getPlayerLeaderBoardScore,
  LeaderBoard,
  sortByMultiple,
} from "../../utils/leaderBoard";
interface LeaderBoardTableProps {
  matches: Game[];
  players: Player[];
}

export const LeaderBoardTable = ({
  matches,
  players,
}: LeaderBoardTableProps) => {
  const [leaders, setLeaders] = useState<LeaderBoard[]>([]);
  useEffect(() => {
    if (players.length > 0 && matches.length > 0) {
      const leaders = players.map((player) =>
        getPlayerLeaderBoardScore(player, matches)
      );
      const sorted = leaders.sort(
        (a, b) =>
          sortByMultiple(b.wins, a.wins) || sortByMultiple(b.diff, a.diff)
      );
      setLeaders(sorted);
    }
  }, [players, matches]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player name</TableCell>
            <TableCell>Games</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Losses</TableCell>
            <TableCell>Draws</TableCell>
            <TableCell>Diff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaders.map((leader, i) => (
            <TableRow
              key={leader.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                className={i === 1 ? "green-bottom-border" : undefined}
              >
                {leader.name}
              </TableCell>
              <TableCell
                className={i === 1 ? "green-bottom-border" : undefined}
              >
                {leader.games}
              </TableCell>
              <TableCell
                className={i === 1 ? "green-bottom-border" : undefined}
              >
                {leader.wins}
              </TableCell>
              <TableCell
                className={i === 1 ? "green-bottom-border" : undefined}
              >
                {leader.losses}
              </TableCell>
              <TableCell
                className={i === 1 ? "green-bottom-border" : undefined}
              >
                {leader.draws}
              </TableCell>
              <TableCell
                className={i === 1 ? "green-bottom-border" : undefined}
              >
                {leader.diff}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
