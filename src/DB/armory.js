import uuid from 'uuid';
import { CreateEquipmentItem } from '../Classes';

export function getEquipment(dungeonLevel, type) {
  let id = uuid();
  let equipmentStats = {id: id};
  // choose equipment type array,
  // filter equipment out that are abouve required dungeon level,
  let availableEquipments = equipments[type].filter(equipment => equipment.minimumDungeonLevel <= dungeonLevel);
  // grab random equipment: balanced[Math.floor(Math.random()*balanced.length)];
  let selectedEquipment = availableEquipments[Math.floor(Math.random() * availableEquipments.length)]['stats']
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
        attack: 2,
        defense: -2,
        svgReference: 'sickle_chain',
      },
      minimumDungeonLevel: 2
    },
    {
      stats: {
        name: 'Turban',
        type: 'armor_head',
        attack: 0,
        defense: 1,
        svgReference: 'helm_cloth',
      },
      minimumDungeonLevel: 2
    },
    {
      stats: {
        name: 'Barrel Chest',
        type: 'armor_torso',
        attack: -2,
        defense: 2,
        svgReference: 'torso_steel',
      },
      minimumDungeonLevel: 2
    },
  ],
  // DEFENSE
  defense: [
    {
      stats: {
        name: 'Steel Toe\'s',
        type: 'armor_foot',
        attack: 0,
        defense: 2,
        svgReference: 'boots_steel',
      },
      minimumDungeonLevel: 4
    },
    {
      stats: {
        name: 'Snail Mail',
        type: 'armor_torso',
        attack: 0,
        defense: 1,
        svgReference: 'torso_chain_mail',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'Hard Head',
        type: 'armor_head',
        attack: -1,
        defense: 2,
        svgReference: 'helm_steel',
      },
      minimumDungeonLevel: 2
    },
    {
      stats: {
        name: 'The Enforcer',
        type: 'weapon',
        attack: 2,
        defense: 0,
        svgReference: 'mace',
      },
      minimumDungeonLevel: 4
    },
  ],
  // ATTACK
  attack: [
    {
      stats: {
        name: 'The Good Knife',
        type: 'weapon',
        attack: 1,
        defense: -1,
        svgReference: 'bone_knife',
      },
      minimumDungeonLevel: 0
    },
    {
      stats: {
        name: 'Tomahawk',
        type: 'weapon',
        attack: 3,
        defense: -1,
        svgReference: 'tomahawk',
      },
      minimumDungeonLevel: 3
    },
    {
      stats: {
        name: 'Bo Bo',
        type: 'weapon',
        attack: 2,
        defense: -1,
        svgReference: 'tomahawk',
      },
      minimumDungeonLevel: 3
    },
  ]
}
