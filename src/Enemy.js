import React, { Component } from 'react';

// function EnemySprite(props) {
//   return (
//     <span className="player red white-text" style={props.style}>
//       P
//     </span>
//   );
// }

class Enemy extends Component {
  render() {
    const style = {
      top: this.props.enemyPosY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.enemyPosX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
    };
    return (
      <div className="Enemy">
        <span className="player purple darken-4 white-text" style={style}>
          E
        </span>
      </div>
    );
  }
}

export default Enemy;
