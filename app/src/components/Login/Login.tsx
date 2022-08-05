import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Context } from "../../store";
import { login } from "../../api/auth";
import { Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Login = () => {
  const { dispatch } = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const handleLogin = async () => {
    if (await login(inputValue)) {
      //Refresh the page to get access to the cookie
      navigate(0);
    }
  };

  useEffect(() => {
    if (cookies.access_token) {
      dispatch({ type: "UPDATE_TOKEN", payload: cookies.access_token });
      navigate("/");
    }
  });
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
            onChange={(event) =>
              setInputValue(event.target.value.toLowerCase())
            }
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                handleLogin();
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
    </Container>
  );
};
