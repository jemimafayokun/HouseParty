import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Grid, Typography, Button, ButtonGroup } from "@mui/material";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { GuestCanPauseProvider } from "../contexts/GuestsCanPause";
import { VotesToSkipProvider } from "../contexts/VotesToSkipContext";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variation="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <VotesToSkipProvider>
      <GuestCanPauseProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                roomCode ? (
                  <Navigate to={`/room/${roomCode}`} />
                ) : (
                  renderHomePage()
                )
              }
            />
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route
              path="/room/:roomCode"
              element={<Room setRoomCode={setRoomCode} />}
            />
          </Routes>
        </Router>
      </GuestCanPauseProvider>
    </VotesToSkipProvider>
  );
}
