import React, { Component } from 'react';

class Player extends Component {
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
          P
          <br/>
          {this.props.player.life}/{this.props.player.calculateStat('defense')}
        </span>
      </div>
    );
  }
}

export default Player;
