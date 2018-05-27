import React, { Component } from 'react';
import { getRandomIntInclusive } from './Helper';
import { CreateActor } from './Classes';
import { getSvg } from './SVGGenerator';
import { getMonster } from './DB/monsters.js';
import uuid from 'uuid';

class Enemy extends Component {

  componentDidUpdate() {
    document.getElementById(this.props.enemy.id).innerHTML = getSvg(this.props.enemy.svgReference, 'none', this.props.cellSize);
  }

  render() {
    const style = {
      top: this.props.enemyPosY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.enemyPosX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
    };

    return (
      <div className="Enemy">
        <span id={this.props.enemy.id} className="player purple darken-4 white-text" style={style}>
          E
          <br/>
          {this.props.enemy.life}/{this.props.enemy.defense}/{this.props.enemy.attack}
        </span>
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
