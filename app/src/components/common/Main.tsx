import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import TabContainer from "./Tabs";
import { Context } from "../../store";
import { login } from "../../api/auth";
import { Box, Card, CardContent } from "@mui/material";

export const Main = () => {
  const { state, dispatch } = useContext(Context);
  const [inputValue, setInputValue] = useState("");

  const handleLogin = async () => {
    const token = await login(inputValue);
    if (token) {
      dispatch({ type: "UPDATE_TOKEN", payload: token });
    }
  };
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
      {state.authToken ? (
        <TabContainer></TabContainer>
      ) : (
        <Card sx={{ minWidth: 275 }} variant="outlined">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box py={2}>Enter password</Box>
            <TextField
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value.toLowerCase())}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  handleLogin()
                }
              }}
            ></TextField>
            <Box py={2}>
              <Button onClick={handleLogin} variant="outlined">
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
