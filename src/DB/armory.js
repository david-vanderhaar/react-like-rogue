import uuid from 'uuid';
import { CreateEquipmentItem } from '../Classes';

export function getEquipment(dungeonLevel, type) {
  let id = uuid();
  let equipmentStats = {id: id};
  // choose equipment type array,
  // filter equipment out that are abouve required dungeon level,
  let availableEquipments = equipments[type].filter(equipment => equipment.minimumDungeonLevel <= dungeonLevel);
  // grab random equipment: balanced[Math.floor(Math.random()*balanced.length)];
  let selectedEquipment = availableEquipments[Math.floor(Math.random()*equipments[type].length)]['stats']
  // merge equipment stats with actor stats object
  return CreateEquipmentItem({...equipmentStats, ...selectedEquipment})
}

let equipments = {
  // BALANCED
  balanced: [
    {
      stats: {
        name: 'Air Force 1\'s',
        type: 'armor_foot',
        attack: 0,
        defense: 1,
        svgReference: 'boots',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'Chain Gang',
        type: 'weapon',
        attack: 4,
        defense: -3,
        svgReference: 'sickle_chain',
      },
      minimumDungeonLevel: 0
    }
  ],
  // DEFENSE
  defense: [
    {
      stats: {
        name: 'Snail Mail',
        type: 'armor_torso',
        attack: 0,
        defense: 2,
        svgReference: 'torso_chain_mail',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'The Enforcer',
        type: 'weapon',
        attack: 1,
        defense: 2,
        svgReference: 'mace',
      },
      minimumDungeonLevel: 0
    }
  ],
  // ATTACK
  attack: [
    {
      stats: {
        name: 'The Good Knife',
        type: 'weapon',
        attack: 1,
        defense: 0,
        svgReference: 'bone_knife',
      },
      minimumDungeonLevel: 0
    }
  ]
}
