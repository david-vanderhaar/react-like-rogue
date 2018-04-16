import { CreateTile, CreateActor, CreatePickUp, CreateEquipmentItem } from './Classes';
import uuid from 'uuid';
var names = require('fantasy-names');


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

export function focusOnGameWindow() {
  document.getElementById("game-window").focus();
}

export function prepareDungeonLevel(dungeonLevel, currentState) {
  const enemies = 1 + (dungeonLevel * 2);
  const pickUps = 10;
  const equipmentItems = 5;

  let enemyList = [];
  for (let i = 0; i < enemies; i++) {
    let id = uuid();
    enemyList.push(CreateActor({id: id, attack: 2, life: 2}));
  }

  let pickUpList = [];
  for (let i = 0; i < pickUps; i++) {
    let id = uuid();
    pickUpList.push(CreatePickUp({id: id}));
  }

  let equipmentItemList = [];
  for (let i = 0; i < equipmentItems; i++) {
    let id = uuid();
    equipmentItemList.push(CreateEquipmentItem({id: id}));
  }

  let newState = {
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
  return newState;
}

export function prepareResetGame(currentState) {
  const enemies = 1;
  const pickUps = 10;
  const equipmentItems = 5;

  let enemyList = [];
  for (let i = 0; i < enemies; i++) {
    let id = uuid();
    enemyList.push(CreateActor({id: id, attack: 2, life: 2}));
  }

  let pickUpList = [];
  for (let i = 0; i < pickUps; i++) {
    let id = uuid();
    pickUpList.push(CreatePickUp({id: id}));
  }

  let equipmentItemList = [];
  for (let i = 0; i < equipmentItems; i++) {
    let id = uuid();
    equipmentItemList.push(CreateEquipmentItem({id: id}));
  }

  let newState = {
    player: CreateActor({id: 'player', life: 5, attack: 3}),
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
  return newState;
}
