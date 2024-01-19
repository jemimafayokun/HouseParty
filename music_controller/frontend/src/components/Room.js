import React, { Component } from "react";
import { useParams } from "react-router-dom";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    const { roomCode } = useParams();
    this.roomCode = roomCode;
  }

  render() {
    return (
      <div>
        <h3>{this.roomCode}</h3>
        <p>Votes: {this.state.votesToSkip}</p>
        <p>Guest Can Pause: {this.state.guestCanPause ? "Yes" : "No"}</p>
        <p>Host: {this.state.isHost ? "Yes" : "No"}</p>
      </div>
    );
  }
}
