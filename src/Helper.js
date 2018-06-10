import uuid from 'uuid';
import $ from 'jquery';
import { CreateTile, CreateActor, CreatePickUp, CreateEquipmentItem } from './Classes';
import { getSvg } from './SVGGenerator';
import * as Enemy from './Enemy';
import * as PickUp from './PickUp';
import * as EquipmentItem from './EquipmentItem';

// Helper Functions
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

export function findClosestRoom(currentRoom, rooms) {
  let mid = {
    x: currentRoom.x + (currentRoom.w / 2),
    y: currentRoom.y + (currentRoom.h / 2)
  };
  let closest = null;
  let closest_distance = 1000;
  for (let i = 0; i < rooms.length; i++) {
    let check = rooms[i];
    if (check === currentRoom) continue;
    let check_mid = {
      x: check.x + (check.w / 2),
      y: check.y + (check.h / 2)
    };
    let distance = Math.abs(mid.x - check_mid.x) + Math.abs(mid.y - check_mid.y);
    if (distance < closest_distance) {
      closest_distance = distance;
      closest = check;
    }
  }
  return closest;
};

export function doesCollide(rooms, room, ignore) {
  for (let i = 0; i < rooms.length; i++) {
    if (i === ignore) continue;
    let check = rooms[i];
    if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h)))
      return true;
  }

  return false;
}

export function cloneTiles(tiles) {
  let clonedTiles = [];
  for (let q = 0; q < tiles.length; q++) {
    clonedTiles.push([]);
    for (let w = 0; w < tiles[q].length; w++) {
      clonedTiles[q].push(Object.assign( Object.create( Object.getPrototypeOf(tiles[q][w])), tiles[q][w]));
      // clonedTiles[q].push({...tiles[q][w]});

    }
  }
  return clonedTiles;
}

export function findPlayer(player) {
  let midY = ($(window).height() / 4)
  let midX = ($(window).width() / 4)
  document.querySelector(".game-container").scroll({ top: (player.posY * 50) - midY, left: player.posX * 50 - midX, behavior: 'smooth' });
}

export function focusOnGameWindow() {
  let el = document.getElementById("game-window");
  if (el) {el.focus();}
}

export function prepareDungeonLevel(dungeonLevel, currentState) {
  const enemies = 1 + (dungeonLevel * 2);
  const pickUps = 10;
  const equipmentItems = 5;
  const levelTypes = [
    'balanced',
    'attack',
    'defense'
  ];

  let currentLevelType = levelTypes[getRandomIntInclusive(0, 2)];

  let enemyList = Enemy.generateEnemies(enemies, dungeonLevel, currentLevelType);

  let pickUpList = PickUp.generatePickUps(pickUps, dungeonLevel, currentLevelType);

  let equipmentItemList = EquipmentItem.generateEquipment(equipmentItems, dungeonLevel, currentLevelType);

  let newState = {
    currentLevelType: currentLevelType,
    dungeonLevel: dungeonLevel,
    mapKey: uuid(),
    showEndDungeonSummary: false,
    canMove: true,
    tileMap: Array(currentState.mapHeight).fill(Array(currentState.mapWidth).fill('')),
    tileTypes: Array(currentState.mapHeight).fill(Array(currentState.mapWidth).fill(CreateTile({type: 'WALL', canPass: false, containsDestructible: false}))),
    dijkstraMap: Array(currentState.mapHeight).fill(Array(currentState.mapWidth).fill(100)),
    enemyList: enemyList,
    pickUpList: pickUpList,
    equipmentItemList: equipmentItemList,
  }

  focusOnGameWindow();
  clearDice();
  return newState;
}

export function prepareResetGame(currentState) {
  const enemies = 1;
  const pickUps = 10;
  const equipmentItems = 5;
  const levelTypes = [
    'balanced',
    'attack',
    'defense'
  ];

  let currentLevelType = levelTypes[getRandomIntInclusive(0, 2)];

  let enemyList = Enemy.generateEnemies(enemies, 0, currentLevelType);

  let pickUpList = PickUp.generatePickUps(pickUps, 0, currentLevelType);

  let equipmentItemList = EquipmentItem.generateEquipment(equipmentItems, 0, currentLevelType);

  let newState = {
    currentLevelType: currentLevelType,
    player: CreateActor({id: 'player'}),
    dungeonLevel: 1,
    mapKey: uuid(),
    defeatedEnemyList: [],
    showEndDungeonSummary: false,
    showEndGame: false,
    canMove: true,
    tileMap: Array(currentState.mapHeight).fill(Array(currentState.mapWidth).fill('')),
    tileTypes: Array(currentState.mapHeight).fill(Array(currentState.mapWidth).fill(CreateTile({type: 'WALL', canPass: false, containsDestructible: false}))),
    dijkstraMap: Array(currentState.mapHeight).fill(Array(currentState.mapWidth).fill(100)),
    enemyList: enemyList,
    pickUpList: pickUpList,
    equipmentItemList: equipmentItemList,
  }

  focusOnGameWindow();
  clearDice();
  return newState;
}

export function throwDice(text, color, svg_name) {
  let die = document.createElement('span');
  let max_move = 25;
  die.setAttribute('class', 'thrown-dice ' + color);
  document.getElementById('game-window').appendChild(die);
  die.innerHTML = getSvg(svg_name, 'none', '60px');

  setTimeout(() => {
    die.style.left = getRandomIntInclusive(50 - max_move, 50 + max_move).toString() + 'vw';
    die.style.top = getRandomIntInclusive(50 - max_move, 50 + max_move).toString() + 'vh';
  }, 100)
  setTimeout(() => {
    die.remove();
  }, 4000)
}

export function clearDice() {
  [].forEach.call(document.querySelectorAll('.thrown-dice'),function(e){
    e.parentNode.removeChild(e);
  });
}
