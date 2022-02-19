import jwtDecode from "jwt-decode";
import { State } from "..";

const handleUpdateToken = (payload: string) => {
  const decoded: { isAdmin: boolean } = jwtDecode(payload);
  return { authToken: payload, isAdmin: decoded.isAdmin };
};

const Reducer = (state: State, action: any) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {
        ...state,
        ...handleUpdateToken(action.payload),
      };
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.payload,
      };

    case "SET_MATCHES":
      return {
        ...state,
        matches: action.payload,
      };
    case "SET_TOURNAMENTS": {
      return {
        ...state,
        tournaments: action.payload,
      };
    }
    case "SET_SELECTED_TOURNAMENT":
      return {
        ...state,
        selectedTournament: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
