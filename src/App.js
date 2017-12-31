import React, { Component } from 'react';
import { getRandomIntInclusive} from './Helper'
import Map from './Map';
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
      tileMap: Array(mapHeight).fill(Array(mapWidth).fill('g')),
      tileTypes: Array(mapHeight).fill(Array(mapWidth).fill({type: 'tile tile-WALL', canPass: false})),
      playerPosX: playerPosX,
      playerPosY: playerPosY,
      enemyList: Array(enemies).fill({posX: 0, posY: 0}),
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
    }
  }
  handlePlayerMove(event) {
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


    this.setState({
      playerPosX,
      playerPosY,
			playerMove,
      tileTypes,
    });

    this.moveEnemies();
  }

  placeEnemies(enemyList, tileTypes) {
    this.setState({
      enemyList,
      tileTypes,
    });
  }

  moveEnemies() {
    let enemyList = this.state.enemyList.concat();

    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
    let tileTs = [];
    for (let q = 0; q < this.state.tileTypes.length; q++) {
      tileTs.push([]);
      for (let w = 0; w < this.state.tileTypes[q].length; w++) {
        tileTs[q].push({...this.state.tileTypes[q][w]});
      }
    }

    for (let i = 0; i < enemyList.length; i++) {
      enemyList[i] = {...enemyList[i]}; //copy the Object
      let posX = enemyList[i].posX;
      let posY = enemyList[i].posY;

      let moveDirection;
      switch (getRandomIntInclusive(0, 3)) {
        case 0:
          moveDirection = 'LEFT';
          break;
        case 1:
          moveDirection = 'UP';
          break;
        case 2:
          moveDirection = 'RIGHT';
          break;
        case 3:
          moveDirection = 'DOWN';
          break;
        default:
          moveDirection = 'LEFT';
          break;
      }

      switch (moveDirection) {
        case 'LEFT':
          if (posX > 0 && tileTs[posY][posX - 1].canPass) {
            tileTs[posY][posX].canPass = true; //reset tile to passable
            posX -= 1;
            tileTs[posY][posX].canPass = false; //set new tile to impassable
          }
          break;
        case 'UP':
          if (posY > 0 && tileTs[posY - 1][posX].canPass) {
            tileTs[posY][posX].canPass = true; //reset tile to passable
            posY -= 1;
            tileTs[posY][posX].canPass = false; //set new tile to impassable
          }
          break;
        case 'RIGHT':
          if (posX < this.state.mapWidth - 1 && tileTs[posY][posX + 1].canPass) {
            tileTs[posY][posX].canPass = true; //reset tile to passable
            posX += 1;
            tileTs[posY][posX].canPass = false; //set new tile to impassable
          }
          break;
        case 'DOWN':
          if (posY < this.state.mapHeight - 1 && tileTs[posY + 1][posX].canPass) {
            tileTs[posY][posX].canPass = true; //reset tile to passable
            posY += 1;
            tileTs[posY][posX].canPass = false; //set new tile to impassable
          }
          break;
        default:
          break;
      }
      enemyList[i].posX = posX;
      enemyList[i].posY = posY;
    }
    console.log(enemyList[0])
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
        </div>
      </div>
    );
  }
}

export default App;
