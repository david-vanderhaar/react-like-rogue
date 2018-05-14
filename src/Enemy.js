import React, { Component } from 'react';
import { getRandomIntInclusive } from './Helper';
import { CreateActor } from './Classes';
import uuid from 'uuid';

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
          <br/>
          {this.props.enemy.life}/{this.props.enemy.defense}/{this.props.enemy.attack}
        </span>
      </div>
    );
  }
}

export default Enemy;

export function generateEnemies(enemyAmount) {
  let levelTypes = [
    'balanced',
    'attack',
    'defense'
  ];

  let enemyTypes = {
    balanced: 0,
    attack: 0,
    defense: 0
  }

  let currentLevelType = levelTypes[getRandomIntInclusive(0, 2)];

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

  let createEnemyType = {
    balanced: function(id) {
      return CreateActor({id: id, life: 3})
    },
    attack: function(id) {
      return CreateActor({id: id, attack: 3})
    },
    defense: function(id) {
      return CreateActor({id: id, defense: 3})
    }
  }

  let enemyList = [];
  for (let type in enemyAmounts) {
    if (enemyAmount > 0) {
      enemyAmounts[type] = Math.ceil(enemyAmount * enemyTypes[type])
      enemyAmount -= enemyAmounts[type];
      for (let i = 0; i < enemyAmounts[type]; i++) {
        let id = uuid();
        enemyList.push(createEnemyType[type](id));
      }
    }
  }
  return enemyList
}
