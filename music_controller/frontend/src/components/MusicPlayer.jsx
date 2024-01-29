import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const MusicPlayer = ({ song, setSong }) => {
  const [songProgress, setSongProgress] = useState(0);

  useEffect(() => {
    setSongProgress((song.time / song.duration) * 100);
  }, [song.time, song.duration]);

  function pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  function playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  function skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions)
      .then((response) => {
        if (response.ok) {
          return fetch("/spotify/current-song");
        } else {
          console.error(
            "Failed to skip song:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to skip song");
        }
      })
      .then((response) => response.json())
      .then((updatedSong) => {
        setSong(updatedSong);
      })
      .catch((error) => {
        console.error("Error during skip:", error);
      });
  }

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={song.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {song.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {song.artist}
          </Typography>
          <div>
            <IconButton onClick={song.is_playing ? pauseSong : playSong}>
              {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={skipSong}>
              {song.votes} / {song.votes_required}
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
};

export default MusicPlayer;
