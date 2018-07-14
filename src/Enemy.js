import React, { Component } from 'react';
import { getSvg } from './SVGGenerator';
import Parser from 'html-react-parser';
import { getMonster } from './DB/monsters.js';
import ReactTooltip from 'react-tooltip'

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
        <span data-tip data-for={'tip-' + this.props.enemy.id} id={this.props.enemy.id} className="monster player purple darken-4 white-text" style={style}>
          {Parser(getSvg(this.props.enemy.svgReference, 'none', this.props.cellSize))}
        </span>
        <ReactTooltip id={'tip-' + this.props.enemy.id} place="left" type="dark" effect="solid" >
          <div>Life: {this.props.enemy.life}</div>
          <div>Defense: {this.props.enemy.defense}</div>
          <div>Attack: {this.props.enemy.attack}</div>
        </ReactTooltip>
      </div>
    );
  }
}

export default Enemy;
// END COMPONENT

export function generateEnemies(enemyAmount, dungeonLevel, currentLevelType) {
  let enemyTypes = {
    balanced: 0,
    attack: 0,
    defense: 0
  }

  for (let type in enemyTypes) {
    if (type === currentLevelType) {
      enemyTypes[type] = 0.6;
    } else {
      enemyTypes[type] = 0.2;
    }
  }

  let enemyAmounts = {
    balanced: 0,
    attack: 0,
    defense: 0,
  }

  let enemyList = [];
  for (let type in enemyAmounts) {
    if (enemyAmount > 0) {
      enemyAmounts[type] = Math.ceil(enemyAmount * enemyTypes[type])
      enemyAmount -= enemyAmounts[type];
      for (let i = 0; i < enemyAmounts[type]; i++) {
        enemyList.push(getMonster(dungeonLevel, type));
      }
    }
  }

  return enemyList
}
