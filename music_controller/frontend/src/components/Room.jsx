import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Button, ButtonGroup } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import { VotesToSkipContext } from "../contexts/VotesToSkipContext";
import { GuestCanPauseContext } from "../contexts/GuestsCanPause";
import MusicPlayer from "./MusicPlayer";

export default function Room({ setRoomCode }) {
  const { roomCode } = useParams();
  const [isHost, setIsHost] = useState(false);
  const [showSetting, setShowSettings] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const { votesToSkip, setVotesToSkip } = useContext(VotesToSkipContext);
  const { guestCanPause, setGuestCanPause } = useContext(GuestCanPauseContext);
  const [song, setSong] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        setRoomCode("");
        navigate(`/`);
        return;
      }
      const data = await response.json();
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);

      if (data.is_host) {
        await authSpotify();
      }
    };

    fetchData();
  }, [roomCode, navigate, setRoomCode, setVotesToSkip, setGuestCanPause]);

  useEffect(() => {
    const interval = setInterval(getCurrentSong, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const authSpotify = async () => {
    try {
      const response = await fetch("/spotify/is-authenticated");
      const data = await response.json();
      setSpotifyAuth(data.status);

      if (!data.status) {
        const authUrlResponse = await fetch("/spotify/get-auth-url");
        const authUrlData = await authUrlResponse.json();
        window.location.replace(authUrlData.url);
      }
    } catch (error) {
      console.error("Error authenticating with Spotify:", error);
    }
  };

  function getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data)
      });
  }

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      setRoomCode("");
      navigate(`/`);
    });
  }

  function settingsPage() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage isUpdate={isUpdate} roomCode={roomCode} />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setShowSettings(false);
              setIsUpdate(false);
            }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  function SettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShowSettings(true);
            setIsUpdate(true);
          }}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  return (

    <Grid container spacing={1}>
      {showSetting ? (
        settingsPage()
      ) : (
        <>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {roomCode}
            </Typography>
          </Grid>
         <MusicPlayer song={song}/>
          {isHost && SettingsButton()}
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
