import uuid from 'uuid';
import { CreatePickUp } from '../Classes';

export function getPickUp(dungeonLevel, type) {
  let id = uuid();
  let pickUpStats = {id: id};
  // choose pickUp type array,
  // filter pickUp out that are abouve required dungeon level,
  let availablePickUps = pickUps[type].filter(pickUp => pickUp.minimumDungeonLevel <= dungeonLevel);
  // grab random pickUp: balanced[Math.floor(Math.random()*balanced.length)];
  let selectedPickUp = availablePickUps[Math.floor(Math.random()*availablePickUps.length)]['stats']
  // merge pickUp stats with actor stats object
  return CreatePickUp({...pickUpStats, ...selectedPickUp})
}

let pickUps = {
  // BALANCED
  balanced: [
    {
      stats: {
        title: 'Live',
        boostValue: 1,
        statName: 'life',
        svgReference: 'life_1',
      },
      minimumDungeonLevel: 0
    }
  ],
  // DEFENSE
  defense: [
    {
      stats: {
        title: 'Guard',
        boostValue: 1,
        statName: 'defense',
        svgReference: 'defense_1',
      },
      minimumDungeonLevel: 0
    }
  ],
  // ATTACK
  attack: [
    {
      stats: {
        title: 'Assail',
        boostValue: 1,
        statName: 'attack',
        svgReference: 'attack_1',
      },
      minimumDungeonLevel: 0
    }
  ]
}
