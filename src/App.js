import React, { Component } from 'react';
import { getRandomIntInclusive, cloneTiles } from './Helper';
import { Tile } from './Classes';
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

    // Player Vars
    const playerPosX = 8;
    const playerPosY = 2;
    this.state = {
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      cellSize: cellSize,
      cellGutter: cellGutter,
      roomCount: roomCount,
      rooms: rooms,
      maxRoomSize: maxRoomSize,
      minRoomSize: minRoomSize,
      tileMap: Array(mapHeight).fill(Array(mapWidth).fill('')),
      // tileTypes: Array(mapHeight).fill(Array(mapWidth).fill({type: 'tile tile-WALL', canPass: false, containsAttackable: false})),
      tileTypes: Array(mapHeight).fill(Array(mapWidth).fill(new Tile('WALL', false, false))),
      dijkstraMap: Array(mapHeight).fill(Array(mapWidth).fill(100)),
      playerPosX: playerPosX,
      playerPosY: playerPosY,
      enemyList: Array(enemies).fill({posX: 0, posY: 0, life: 1, attack: 1, defense: 1}),
      enemyPosX: 0,
      enemyPosY: 0,
			playerMove: {
        rotate: 0,
        direction: 'rotateY'
      },
      playerControls: {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40
      },
      playerStats: {
        life: 10,
        attack: 1,
        defense: 1,
      },
    }
  }
  handlePlayerMove(event) { // MAIN TURN LOOP
    let state = {...this.state};
    let playerControls = state.playerControls;
    let playerPosX = state.playerPosX;
    let playerPosY = state.playerPosY;
		let playerMove = {...state.playerMove};
		let tileTypes = state.tileTypes; //tile objs still refering to state tiles

    tileTypes[playerPosY][playerPosX].canPass = true;

    switch (event.keyCode) {
      case playerControls['LEFT']:
        (playerPosX > 0 && tileTypes[playerPosY][playerPosX - 1].canPass) ? playerPosX -= 1 : playerPosX += 0;
        playerMove.rotate > -360 ?  playerMove.rotate -= 180 : playerMove.rotate = 0;
        playerMove.direction = 'rotateY';
        break;
      case playerControls['UP']:
        playerPosY > 0 && tileTypes[playerPosY - 1][playerPosX].canPass ? playerPosY -= 1 : playerPosY += 0;
        playerMove.rotate < 360 ?  playerMove.rotate += 180 : playerMove.rotate = 0;
        playerMove.direction = 'rotateX';
        break;
      case playerControls['RIGHT']:
        playerPosX < state.mapWidth - 1 && tileTypes[playerPosY][playerPosX + 1].canPass ? playerPosX += 1 : playerPosX += 0;
        playerMove.rotate < 360 ?  playerMove.rotate += 180 : playerMove.rotate = 0;
        playerMove.direction = 'rotateY';
        break;
      case playerControls['DOWN']:
        playerPosY < state.mapHeight - 1 && tileTypes[playerPosY + 1][playerPosX].canPass ? playerPosY += 1 : playerPosY += 0;
        playerMove.rotate > -360 ?  playerMove.rotate -= 180 : playerMove.rotate = 0;
        playerMove.direction = 'rotateX';
        break;
      default:
        break;
    }

    tileTypes[playerPosY][playerPosX].canPass = false;
    this.dijkstraMap.generateDijkstraMap(tileTypes, [{posX: playerPosX, posY: playerPosY}]);

    this.setState({
      playerPosX,
      playerPosY,
			playerMove,
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
      let neighbors = this.dijkstraMap.getNeigbors(enemyList[i], this.state.dijkstraMap);

      if (neighbors.length > 0) {
        if (tileTs[neighbors[0].posY][neighbors[0].posX].canPass === true) { // check that the tile is passable
          tileTs[posY][posX].canPass = true; //reset current tile to passable
          enemyList[i].posX = neighbors[0].posX;
          enemyList[i].posY = neighbors[0].posY;
          tileTs[neighbors[0].posY][neighbors[0].posX].canPass = false; //set new tile to impassable
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
    this.setState({
      tileTypes: tileTs,
      playerPosX: playerPosX,
      playerPosY: playerPosY,
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

  render() {
    // Generate enemies
    let enemyCount = 0;
    const enemies = this.state.enemyList.map((enemy) => {
      enemyCount++
      return (
        <Enemy
          key = {enemyCount}
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
            state = {Object.assign({}, this.state)}

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
            playerMove = {this.state.playerMove.direction + '( ' + this.state.playerMove.rotate.toString() + 'deg )'}
            playerPosX = {this.state.playerPosX}
            playerPosY = {this.state.playerPosY}
            cellSize = {this.state.cellSize}
            cellGutter = {this.state.cellGutter}
          />
          { enemies }
          <DijkstraMap
            ref={(dijkstraMap) => { this.dijkstraMap = dijkstraMap; }}
            dijkstraMap = {this.state.dijkstraMap}
            tileTypes = {this.state.tileTypes}
            goalPositions = {[{posX: this.state.playerPosX, posY: this.state.playerPosY}]}
            handleGenerateDijkstraMap = {this.handleGenerateDijkstraMap.bind(this)}
            cellSize = {this.state.cellSize}
            cellGutter = {this.state.cellGutter}
          />
        </div>
      </div>
    );
  }
}

export default App;
