import React, { Component } from 'react';
import { cloneTiles } from './Helper';
import { CreateTile, CreateActor } from './Classes';
import Map from './Map';
import DijkstraMap from './DijkstraMap';
import Player from './Player';
import Enemy from './Enemy';
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

    const player = CreateActor({attack: 2});

    this.state = {
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      showDijkstraMap: true,
      cellSize: cellSize,
      cellGutter: cellGutter,
      roomCount: roomCount,
      rooms: rooms,
      maxRoomSize: maxRoomSize,
      minRoomSize: minRoomSize,
      tileMap: Array(mapHeight).fill(Array(mapWidth).fill('')),
      tileTypes: Array(mapHeight).fill(Array(mapWidth).fill(CreateTile({type: 'WALL', canPass: false, containsDestructible: false}))),
      dijkstraMap: Array(mapHeight).fill(Array(mapWidth).fill(100)),
      enemyList: Array(enemies).fill(CreateActor()),
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
          if (tileToCheck.containsDestructible) {
            tileToCheck.destructible.life -= (player.attack - tileToCheck.destructible.defense)
          }
        }
        break;
      case playerControls['UP']:
        tileToCheck = tileTypes[player.posY - 1][player.posX];
        if (player.posY > 0) {
          if (tileToCheck.canPass) {
            player.posY -= 1;
          }
          if (tileToCheck.containsDestructible) {
            tileToCheck.destructible.life -= (player.attack - tileToCheck.destructible.defense)
          }
        }
        break;
      case playerControls['RIGHT']:
        tileToCheck = tileTypes[player.posY][player.posX + 1];
        if (player.posX < state.mapWidth - 1) {
          if (tileToCheck.canPass) {
            player.posX += 1;
          }
          if (tileToCheck.containsDestructible) {
            tileToCheck.destructible.life -= (player.attack - tileToCheck.destructible.defense)
          }
        }
        break;
      case playerControls['DOWN']:
        tileToCheck = tileTypes[player.posY + 1][player.posX];
        if (player.posY < state.mapHeight - 1) {
          if (tileToCheck.canPass) {
            player.posY += 1;
          }
          if (tileToCheck.containsDestructible) {
            tileToCheck.destructible.life -= (player.attack - tileToCheck.destructible.defense)
          }
        }
        break;
      default:
        break;
    }

    tileTypes[player.posY][player.posX].canPass = false;
    this.dijkstraMap.generateDijkstraMap(tileTypes, [{posX: player.posX, posY: player.posY}]);

    this.setState({
      player,
      tileTypes,
    });

    this.moveEnemies();
  } // end handlePlayerMove (MAIN TURN LOOP)

  placeEnemies(enemyList, tileTypes) {
    this.setState({
      enemyList,
      tileTypes,
    });
  }

  moveEnemies() {
    let enemyList = this.state.enemyList.concat();

    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
    let tileTs = cloneTiles(this.state.tileTypes);

    for (let i = 0; i < enemyList.length; i++) {
      enemyList[i] = {...enemyList[i]}; //copy the Object
      let posX = enemyList[i].posX;
      let posY = enemyList[i].posY;
      tileTs[posY][posX].destructible = enemyList[i]; //reset current tile
      let neighbors = this.dijkstraMap.getNeigbors(enemyList[i], this.state.dijkstraMap);

      if (neighbors.length > 0) {
        if (tileTs[neighbors[0].posY][neighbors[0].posX].canPass === true) { // check that the tile is passable
          tileTs[posY][posX].canPass = true; //reset current tile to passable
          tileTs[posY][posX].containsDestructible = false; //reset current tile
          tileTs[posY][posX].destructible = {}; //reset current tile
          enemyList[i].posX = neighbors[0].posX;
          enemyList[i].posY = neighbors[0].posY;
          tileTs[neighbors[0].posY][neighbors[0].posX].canPass = false; //set new tile to impassable
          tileTs[neighbors[0].posY][neighbors[0].posX].containsDestructible = true;
          tileTs[neighbors[0].posY][neighbors[0].posX].destructible = enemyList[i];
        }
      }
    }
    this.setState({
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

  render() {
    // Generate enemies
    let enemyCount = 0;
    const enemies = this.state.enemyList.map((enemy) => {
      enemyCount++
      return (
        <Enemy
          key = {enemyCount}
          life = {enemy.life}
          enemyPosX = {enemy.posX}
          enemyPosY = {enemy.posY}
          cellSize = {this.state.cellSize}
          cellGutter = {this.state.cellGutter}
        />
      );
    });
    return (
      <div className="App" tabIndex="0" onKeyUp={this.handlePlayerMove.bind(this)}>
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
          />
          <Player
            player = {this.state.player}
            cellSize = {this.state.cellSize}
            cellGutter = {this.state.cellGutter}
          />
          { enemies }
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
