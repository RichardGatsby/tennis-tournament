import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import TabContainer from "./Tabs";
import { Context } from "../../store";
import { login } from "../../api/auth";

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
        marginRight: 0
      }}
    >
      {state.authToken ? (
        <TabContainer></TabContainer>
      ) : (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 0,
            marginRight: 0
          }}
        >
          Enter password
          <TextField
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          ></TextField>
          <Button onClick={handleLogin}>Login</Button>
        </Container>
      )}
    </Container>
  );
};
