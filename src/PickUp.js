import React, { Component } from 'react';

class PickUp extends Component {
  render() {
    const style = {
      top: this.props.pickUp.posY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.pickUp.posX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
    };
    return (
      <div className="PickUp">
        <span className="player amber darken-4 white-text" style={style}>
          Pi
          <br/>
          {this.props.pickUp.boostValue}
        </span>
      </div>
    );
  }
}

export default PickUp;
