import React, { Component } from 'react';
import { findPlayer } from './Helper';
import MobileMoveControls from './MobileMoveControls';

class Player extends Component {
  componentWillReceiveProps() {
    findPlayer(this.props.player)
  }

  render() {
    const style = {
      top: this.props.player.posY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.player.posX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
    };

    return (
      <div className="Player">
        <span id="player" className="player black white-text" style={style}>
          <MobileMoveControls
            onLeft={() => {this.props.handlePlayerMove(37)}}
            onRight={() => {this.props.handlePlayerMove(39)}}
            onUp={() => {this.props.handlePlayerMove(38)}}
            onDown={() => {this.props.handlePlayerMove(40)}}
            onStay={() => {this.props.handlePlayerMove(32)}}
          />
          P
          <br/>
          {this.props.player.life}/{this.props.player.calculateStat('defense')}
        </span>
      </div>
    );
  }
}

export default Player;
