import React, { Component } from 'react';
import { getSvg } from './SVGGenerator';
import Parser from 'html-react-parser';
import { getPickUp } from './DB/pickups.js';

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
        <span id={this.props.pickUp.id} className="item amber darken-4 white-text" style={style}>
          {Parser(getSvg(this.props.pickUp.svgReference, 'none', this.props.cellSize))}
        </span>
      </div>
    );
  }
}

export default PickUp;

export function generatePickUps(amount, dungeonLevel, currentLevelType) {
  let pickUpTypes = {
    balanced: 0,
    attack: 0,
    defense: 0
  }

  for (let type in pickUpTypes) {
    if (type === currentLevelType) {
      pickUpTypes[type] = 0.6;
    } else {
      pickUpTypes[type] = 0.2;
    }
  }

  let typeAmounts = {
    balanced: 0,
    attack: 0,
    defense: 0,
  }

  let pickUpList = [];
  for (let type in typeAmounts) {
    if (amount > 0) {
      typeAmounts[type] = Math.ceil(amount * pickUpTypes[type])
      amount -= typeAmounts[type];
      for (let i = 0; i < typeAmounts[type]; i++) {
        pickUpList.push(getPickUp(dungeonLevel, type));
      }
    }
  }

  return pickUpList
}
