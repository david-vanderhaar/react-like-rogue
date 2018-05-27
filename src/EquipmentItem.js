import React, { Component } from 'react';
import { getSvg } from './SVGGenerator';
import { getEquipment } from './DB/armory.js';

class EquipmentItem extends Component {

  componentDidUpdate() {
    document.getElementById(this.props.equipmentItem.id).innerHTML = getSvg(this.props.equipmentItem.svgReference, 'none', this.props.cellSize);
  }

  render() {
    const style = {
      top: this.props.equipmentItem.posY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.equipmentItem.posX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
    };
    return (
      <div className="EquipmentItem">
        <span id={this.props.equipmentItem.id} className="item grey white-text" style={style}>
          {this.props.equipmentItem.type}
        </span>
      </div>
    );
  }
}

export default EquipmentItem;

export function generateEquipment(amount, dungeonLevel, currentLevelType) {
  let equipmentTypes = {
    balanced: 0,
    attack: 0,
    defense: 0
  }

  for (let type in equipmentTypes) {
    if (type === currentLevelType) {
      equipmentTypes[type] = 0.6;
    } else {
      equipmentTypes[type] = 0.2;
    }
  }

  let typeAmounts = {
    balanced: 0,
    attack: 0,
    defense: 0,
  }

  let equipmentList = [];
  for (let type in typeAmounts) {
    if (amount > 0) {
      typeAmounts[type] = Math.ceil(amount * equipmentTypes[type])
      amount -= typeAmounts[type];
      for (let i = 0; i < typeAmounts[type]; i++) {
        equipmentList.push(getEquipment(dungeonLevel, type));
      }
    }
  }

  return equipmentList
}
