import uuid from 'uuid';
import { CreateActor } from '../Classes';
import { getRandomIntInclusive } from '../Helper';

export function getMonster(dungeonLevel, type) {
  let id = uuid();
  let actorStats = {id: id};
  // choose monster type array,
  // filter monster out that are abouve required dungeon level,
  let availableMonsters = monsters[type].filter(monster => monster.minimumDungeonLevel <= dungeonLevel);
  // grab random monster: balanced[Math.floor(Math.random()*balanced.length)];
  let selectedMonster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)]['stats']
  // merge monster stats with actor stats object
  return CreateActor({...actorStats, ...selectedMonster})
}

export function getAllMonsterData() {
  return [...monsters['balanced'], ...monsters['defense'], ...monsters['attack']]
}

let monsters = {
  // BALANCED
  balanced: [
    {
      stats: {
        name: 'Goblin',
        life: 1,
        defense: 1,
        attack: 1,
        svgReference: 'goblin',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'Kobold',
        life: 1,
        defense: 1,
        attack: 1,
        svgReference: 'kobold',
      },
      minimumDungeonLevel: 1
    },
    {
      stats: {
        name: 'Cave Dweller',
        life: 1,
        defense: 2,
        attack: 2,
        svgReference: 'cave_dweller',
      },
      minimumDungeonLevel: 2
    },
    {
      stats: {
        name: 'Wyrm',
        life: 1,
        defense: 3,
        attack: 3,
        svgReference: 'wyrm',
      },
      minimumDungeonLevel: 3
    },
    {
      stats: {
        name: 'Dark Spawn',
        life: 2,
        defense: 4,
        attack: 4,
        svgReference: 'dark_spawn',
      },
      minimumDungeonLevel: 4
    },
  ],
  // DEFENSE
  defense: [
    {
      stats: {
        name: 'Fat Goblin',
        life: 2,
        defense: 0,
        attack: 1,
        svgReference: 'fat_goblin',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'Fat Kobold',
        life: 2,
        defense: 1,
        attack: 1,
        svgReference: 'fat_kobold',
      },
      minimumDungeonLevel: 1
    },
    {
      stats: {
        name: 'Fat Cave Dweller',
        life: 2,
        defense: 2,
        attack: 1,
        svgReference: 'fat_cave_dweller',
      },
      minimumDungeonLevel: 2
    },
    {
      stats: {
        name: 'Fat Wyrm',
        life: 3,
        defense: 3,
        attack: 1,
        svgReference: 'fat_wyrm',
      },
      minimumDungeonLevel: 3
    },
    {
      stats: {
        name: 'Fat Dark Spawn',
        life: 4,
        defense: 4,
        attack: 2,
        svgReference: 'fat_dark_spawn',
      },
      minimumDungeonLevel: 4
    },
  ],
  // ATTACK
  attack: [
    {
      stats: {
        name: 'Fierce Goblin',
        life: 1,
        defense: 0,
        attack: 2,
        svgReference: 'fierce_goblin',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'Fierce Kobold',
        life: 1,
        defense: 0,
        attack: 3,
        svgReference: 'fierce_kobold',
      },
      minimumDungeonLevel: 1
    },
    {
      stats: {
        name: 'Fierce Cave Dweller',
        life: 2,
        defense: 0,
        attack: 3,
        svgReference: 'fierce_cave_dweller',
      },
      minimumDungeonLevel: 3
    },
    {
      stats: {
        name: 'Fierce Wyrm',
        life: 3,
        defense: 1,
        attack: 4,
        svgReference: 'fierce_wyrm',
      },
      minimumDungeonLevel: 4
    },
    {
      stats: {
        name: 'Fierce Dark Spawn',
        life: 3,
        defense: 1,
        attack: 5,
        svgReference: 'fierce_dark_spawn',
      },
      minimumDungeonLevel: 5
    },
  ]
}
