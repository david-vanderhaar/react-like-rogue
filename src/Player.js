import React, { Component } from 'react';

// function PlayerSprite(props) {
//   return (
//     <span className="player red white-text" style={props.style}>
//       P
//     </span>
//   );
// }

class Player extends Component {
  render() {
    const style = {
      top: this.props.playerPosY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.playerPosX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
      transform: this.props.playerMove,
    };
    return (
      <div className="Player">
        <span className="player black white-text" style={style}>
          P
        </span>
      </div>
    );
  }
}

export default Player;
