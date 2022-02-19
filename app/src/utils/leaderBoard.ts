import { Game } from "../api/matchesApi";
import { Player } from "../api/playersApi";

export interface LeaderBoard {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  diff: number;
}

const getDiff = (playerId: number, match: Game): number => {
  const diff =
    match.player_one_score > match.player_two_score
      ? match.player_one_score - match.player_two_score
      : match.player_two_score - match.player_one_score;
  return match.winner === playerId ? diff : -diff;
};

export const sortByMultiple = (a: number, b: number) => {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};
const playerInGame = (playerId: number, match: Game): boolean => {
  return match.player_one_id === playerId || match.player_two_id === playerId;
};

const hasScores = (match: Game): boolean => {
  return !!match.player_one_score && !!match.player_two_score;
};
export const getPlayerLeaderBoardScore = (
  player: Player,
  matches: Game[]
): LeaderBoard => {
  return {
    name: player.name,
    games: matches.filter(
      (match) => playerInGame(player.player_id, match) && hasScores(match)
    ).length,
    wins: matches.filter((match) => match.winner === player.player_id).length,
    losses: matches.filter(
      (match) =>
        playerInGame(player.player_id, match) &&
        match.winner &&
        match.winner !== player.player_id
    ).length,
    draws: matches.filter(
      (match) =>
        playerInGame(player.player_id, match) &&
        hasScores(match) &&
        match.player_one_score === match.player_two_score
    ).length,
    diff: matches
      .filter((match) => playerInGame(player.player_id, match))
      .reduce((acc, match) => acc + getDiff(player.player_id, match), 0),
  };
};
