import React, { Component } from 'react';
import uuid from 'uuid4'; //generates unique ids
import { cloneTiles } from './Helper';
import StatBar from './UI/StatBar';
import Inventory from './UI/Inventory';
import { CreateTile, CreateActor, CreatePickUp } from './Classes';
import Map from './Map';
import DijkstraMap from './DijkstraMap';
import Player from './Player';
import Enemy from './Enemy';
import PickUp from './PickUp';
import './App.css';

class App extends Component {

  constructor() {
    super();
    // Map width/height control determine number of cells across/down the page
    const mapWidth = 48;
    const mapHeight = 26;
    const cellSize = 50; // pixel width/height of each cell
    const cellGutter = 4; // pixels between each cell

    //Dungeon Vars
    const roomCount = 12;
    const rooms = []; // holds all room info
    const maxRoomSize = 8;
    const minRoomSize = 4;
    const enemies = 10;
    const pickUps = 10;

    const player = CreateActor({id: 'player', life: 5, attack: 3});

    let enemyList = [];
    for (let i = 0; i < enemies; i++) {
      let id = i;
      // let id = uuid();
      enemyList.push(CreateActor({id: id, attack: 2, life: 2}));
    }

    let pickUpList = [];
    for (let i = 0; i < pickUps; i++) {
      let id = i;
      // let id = uuid();
      pickUpList.push(CreatePickUp({id: id}));
    }

    this.state = {
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      showDijkstraMap: false,
      cellSize: cellSize,
      cellGutter: cellGutter,
      roomCount: roomCount,
      rooms: rooms,
      maxRoomSize: maxRoomSize,
      minRoomSize: minRoomSize,
      tileMap: Array(mapHeight).fill(Array(mapWidth).fill('')),
      tileTypes: Array(mapHeight).fill(Array(mapWidth).fill(CreateTile({type: 'WALL', canPass: false, containsDestructible: false}))),
      dijkstraMap: Array(mapHeight).fill(Array(mapWidth).fill(100)),
      enemyList: enemyList,
      // enemyList: Array(enemies).fill(CreateActor()),
      pickUpList: pickUpList,
      // pickUpList: Array(pickUps).fill(CreatePickUp()),
      defeatedEnemyList: [],
      enemyPosX: 0,
      enemyPosY: 0,
      player: player,
      playerControls: {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40
      },
    }
  }
  handlePlayerMove(event) { // MAIN TURN LOOP
    let state = {...this.state};
    let playerControls = state.playerControls;
    let player = {...state.player};
		let tileTypes = state.tileTypes; //tile objs still refering to state tiles
    let tileToCheck;

    tileTypes[player.posY][player.posX].canPass = true;

    switch (event.keyCode) {
      case playerControls['LEFT']:
        tileToCheck = tileTypes[player.posY][player.posX - 1];
        if (player.posX > 0) {
          if (tileToCheck.canPass) {
            player.posX -= 1;
          }
        }
        break;
      case playerControls['UP']:
        tileToCheck = tileTypes[player.posY - 1][player.posX];
        if (player.posY > 0) {
          if (tileToCheck.canPass) {
            player.posY -= 1;
          }
        }
        break;
      case playerControls['RIGHT']:
        tileToCheck = tileTypes[player.posY][player.posX + 1];
        if (player.posX < state.mapWidth - 1) {
          if (tileToCheck.canPass) {
            player.posX += 1;
          }
        }
        break;
      case playerControls['DOWN']:
        tileToCheck = tileTypes[player.posY + 1][player.posX];
        if (player.posY < state.mapHeight - 1) {
          if (tileToCheck.canPass) {
            player.posY += 1;
          }
        }
        break;
      default:
        tileToCheck = tileTypes[player.posY][player.posX];
        break;
    }

    let enemyList = this.state.enemyList.concat();
    if (tileToCheck.containsDestructible) {
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i] = {...enemyList[i]}; //copy the Object
        if (enemyList[i].id === tileToCheck.destructibleId) {
          enemyList[i].takeHit(player.attack);
        }
      }
    }

    let pickUpList = this.state.pickUpList.concat();
    if (tileToCheck.containsPickUp) {
      for (let i = 0; i < pickUpList.length; i++) {
        pickUpList[i] = {...pickUpList[i]}; //copy the Object
        if (pickUpList[i].id === tileToCheck.pickUpId) {
          pickUpList[i].taken = true;
          player.inventory.push({...pickUpList[i]})
        }
      }
    }

    tileTypes[player.posY][player.posX].canPass = false;
    this.dijkstraMap.generateDijkstraMap(tileTypes, [{posX: player.posX, posY: player.posY}]);

    this.setState({
      player,
      tileTypes,
    });

    this.updatePickUps(tileTypes, pickUpList);
    this.moveEnemies(player, enemyList);
  } // end handlePlayerMove (MAIN TURN LOOP)

  placeEnemies(enemyList, tileTypes) {
    this.setState({
      enemyList,
      tileTypes,
    });
  }

  placePickUps(pickUpList, tileTypes) {
    this.setState({
      pickUpList,
      tileTypes,
    });
  }

  updatePickUps(tileTs, pickUpList) {
    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
    // let tileTs = cloneTiles(this.state.tileTypes);

    pickUpList = pickUpList.filter((pickUp) => {
      if (pickUp.taken === false) {
        return true;
      } else {
        tileTs[pickUp.posY][pickUp.posX].containsPickUp = false;
        tileTs[pickUp.posY][pickUp.posX].pickUpId = null; //reset current tile
        return false;
      }
    });

    this.setState({
      pickUpList,
      tileTypes: tileTs,
    });
  }

  moveEnemies(player, enemyList) {
    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
    let tileTs = cloneTiles(this.state.tileTypes);

    for (let i = 0; i < enemyList.length; i++) {
      // enemyList[i] = {...enemyList[i]}; //copy the Object
      let posX = enemyList[i].posX;
      let posY = enemyList[i].posY;
      tileTs[posY][posX].destructibleId = enemyList[i].id; //reset current tile
      let neighbors = this.dijkstraMap.getNeigbors(enemyList[i], this.state.dijkstraMap);

      if (neighbors.length > 0) {
        let tileToCheck = tileTs[neighbors[0].posY][neighbors[0].posX];

        // This snippet would allow enemies to damage each other
        // if (tileToCheck.containsDestructible) {
        //     tileToCheck.destructible.takeHit(enemyList[i].attack);
        // }

        // this snippet targets only the player
        if (neighbors[0].posX === player.posX && neighbors[0].posY === player.posY) {
          player.takeHit(enemyList[i].attack);
        }

        if (tileToCheck.canPass === true) { // check that the tile is passable
          tileTs[posY][posX].canPass = true; //reset current tile to passable
          tileTs[posY][posX].containsDestructible = false; //reset current tile
          tileTs[posY][posX].destructibleId = null; //reset current tile
          enemyList[i].posX = neighbors[0].posX;
          enemyList[i].posY = neighbors[0].posY;
          tileToCheck.canPass = false; //set new tile to impassable
          tileToCheck.containsDestructible = true;
          tileToCheck.destructibleId = enemyList[i].id;
        }
      }
    }

    enemyList = enemyList.filter((enemy) => {
      if (enemy.life > 0) {
        return true;
      } else {
        tileTs[enemy.posY][enemy.posX].canPass = true; //reset current tile to passable
        tileTs[enemy.posY][enemy.posX].containsDestructible = false; //reset current tile
        tileTs[enemy.posY][enemy.posX].destructibleId = null; //reset current tile
        return false;
      }
    });

    this.setState({
      player,
      enemyList,
      tileTypes: tileTs,
    });
  }

  generateRooms(rooms) {
    this.setState({
      rooms: rooms
    });
  }

  carveRooms(tileTs, playerPosX, playerPosY) {
    let player = {...this.state.player}
    player.posX = playerPosX;
    player.posY = playerPosY;
    this.setState({
      tileTypes: tileTs,
      player,
    });
  }

  carveHalls(tileTs) {
    this.setState({
      tileTypes: tileTs,
    });
  }

  handleGenerateDijkstraMap(dijkstraMap) {
    this.setState({
      dijkstraMap,
    });
  }

  handleToggleDijkstraMap(showDijkstraMap) {
    showDijkstraMap = !this.state.showDijkstraMap;
    this.setState({
      showDijkstraMap,
    });
  }

  handlePlayerUpdate(player) {
    this.setState({
      player,
    });
  }

  render() {
    // Generate enemies
    let enemyCount = 0;
    const enemies = this.state.enemyList.map((enemy) => {
      enemyCount++
      return (
        <Enemy
          key = {enemyCount}
          enemy = {enemy}
          enemyPosX = {enemy.posX}
          enemyPosY = {enemy.posY}
          cellSize = {this.state.cellSize}
          cellGutter = {this.state.cellGutter}
        />
      );
    });

    // Generate pickUps
    let pickUpCount = 0;
    const pickUps = this.state.pickUpList.map((pickUp) => {
      pickUpCount++
      return (
        <PickUp
          key = {pickUpCount}
          pickUp = {pickUp}
          cellSize = {this.state.cellSize}
          cellGutter = {this.state.cellGutter}
        />
      );
    });

    return (
      <div className="App" tabIndex="0" onKeyUp={this.handlePlayerMove.bind(this)}>
        <StatBar
          name="life"
          color="red"
          icon="fa fa-heart stat-icon"
          stat={this.state.player.life}
          statMax={10}
          position={{top: 10, left: 2, width: 6, height: 25, gutter: 1, iconSize: 6}}
        />
        <StatBar
          name="defense"
          color="blue"
          icon="fa fa-shield stat-icon"
          stat={this.state.player.defense}
          statMax={10}
          position={{top: 40, left: 2, width: 6, height: 25, gutter: 1, iconSize: 6}}
        />
        <StatBar
          name="attack"
          color="green"
          icon="fa fa-legal stat-icon"
          stat={this.state.player.attack}
          statMax={10}
          position={{top: 70, left: 2, width: 6, height: 25, gutter: 1, iconSize: 6}}
        />

        <Inventory
          player = {this.state.player}
          inventory = {this.state.player.inventory}
          handlePlayerUpdate = {this.handlePlayerUpdate.bind(this)}
        />
        <div className="game-container">
          <Map
            rooms = {this.state.rooms}
            roomCount = {this.state.roomCount}
            maxRoomSize = {this.state.maxRoomSize}
            minRoomSize = {this.state.minRoomSize}
            carveRooms = {this.carveRooms.bind(this)}
            carveHalls = {this.carveHalls.bind(this)}
            generateRooms = {this.generateRooms.bind(this)}
            mapHeight = {this.state.mapHeight}
            mapWidth = {this.state.mapWidth}
            tileTypes = {this.state.tileTypes}
            tileMap = {this.state.tileMap}
            cellSize = {this.state.cellSize}
            cellGutter = {this.state.cellGutter}
            enemyList = {this.state.enemyList}
            placeEnemies = {this.placeEnemies.bind(this)}
            pickUpList = {this.state.pickUpList}
            placePickUps = {this.placePickUps.bind(this)}
          />
          <Player
            player = {this.state.player}
            cellSize = {this.state.cellSize}
            cellGutter = {this.state.cellGutter}
          />
          { enemies }
          { pickUps }
          <DijkstraMap
            ref={(dijkstraMap) => { this.dijkstraMap = dijkstraMap; }}
            showDijkstraMap = {this.state.showDijkstraMap}
            dijkstraMap = {this.state.dijkstraMap}
            tileTypes = {this.state.tileTypes}
            goalPositions = {[{posX: this.state.player.posX, posY: this.state.player.posY}]}
            handleGenerateDijkstraMap = {this.handleGenerateDijkstraMap.bind(this)}
            handleToggleDijkstraMap = {this.handleToggleDijkstraMap.bind(this)}
            cellSize = {this.state.cellSize}
            cellGutter = {this.state.cellGutter}
          />
        </div>

      </div>
    );
  }
}

export default App;
