import { createContext, useReducer } from "react";
import { Game } from "../api/matchesApi";
import { Player } from "../api/playersApi";
import { Tournament } from "../api/tournamentsApi";
import Reducer from "./reducers";

export interface State {
  authToken: string | null;
  players: Player[];
  matches: Game[];
  isAdmin: boolean;
  selectedTournament: Tournament | null;
  tournaments: Tournament[];
}
const initialState: State = {
  authToken: null,
  players: [],
  matches: [],
  tournaments: [],
  isAdmin: false,
  selectedTournament: null,
};

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });
export default Store;
