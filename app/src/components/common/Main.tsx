import { useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import { Context } from "../../store";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
import AdminActions from "../AdminActions/AdminActions";
import Box from "@mui/material/Box";
import TabContainer from "./Tabs";
import { useCookies } from "react-cookie";
import { getTournaments } from "../../api/tournamentsApi";
import TournamentSelector from "../TournamentSelector/TournamentSelector";

export const Main = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();

  const loadTournaments = async () => {
    try {
      const tournaments = await getTournaments(state.authToken as string);
      dispatch({ type: "SET_TOURNAMENTS", payload: tournaments });
    } catch (e) {
      //TODO: implement real error handling for 401 this is horrible :))
      removeCookie("access_token", '');
      dispatch({ type: "UPDATE_TOKEN", payload: null });
    }
  };

  useEffect(() => {
    if (!state.authToken) {
      if (cookies.access_token) {
        dispatch({ type: "UPDATE_TOKEN", payload: cookies.access_token });
      } else {
        navigate("/login");
      }
    }
  }, []);
  useEffect(() => {
    if (state.authToken) {
      loadTournaments();
    }
  }, [state.authToken]);

  return (
    <Container
      disableGutters={window.innerWidth < 400}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <Box sx={{ width: "100%" }}>
        {state.isAdmin && <AdminActions />}
        {state.tournaments && <TournamentSelector />}
        <Routes>
          <Route path="/tournaments/:tournamentId" element={<TabContainer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Container>
  );
};
