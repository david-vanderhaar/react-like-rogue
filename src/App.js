import React, { Component } from 'react';
import Map from './Map';
import Player from './Player';
import './App.css';
import { getRandomIntInclusive, findClosestRoom, doesCollide } from './Helper'

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
    let playerControls = this.state.playerControls;
    let playerPosX = this.state.playerPosX;
    let playerPosY = this.state.playerPosY;
		let playerMove = this.state.playerMove;
		let tileTypes = this.state.tileTypes;

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
        playerPosX < this.state.mapWidth - 1 && tileTypes[playerPosY][playerPosX + 1].canPass ? playerPosX += 1 : playerPosX += 0;
        playerMove.rotate < 360 ?  playerMove.rotate += 180 : playerMove.rotate = 0;
        playerMove.direction = 'rotateY';
        break;
      case playerControls['DOWN']:
        playerPosY < this.state.mapHeight - 1 && tileTypes[playerPosY + 1][playerPosX].canPass ? playerPosY += 1 : playerPosY += 0;
        playerMove.rotate > -360 ?  playerMove.rotate -= 180 : playerMove.rotate = 0;
        playerMove.direction = 'rotateX';
        break;
      default:
        break;
    }

    this.setState({
      playerPosX: playerPosX,
      playerPosY: playerPosY,
			playerMove: playerMove,
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

  componentDidMount() {
    document.addEventListener('keyup', this.handlePlayerMove.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div className="game-container">
          <Map
              playerPosX = {this.state.playerPosX}
              playerPosY = {this.state.playerPosY}
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
              cellGutter = {this.state.cellGutter}/>
          <Player playerMove= {this.state.playerMove.direction + '( ' + this.state.playerMove.rotate.toString() + 'deg )'} playerPosX = {this.state.playerPosX} playerPosY = {this.state.playerPosY} cellSize = {this.state.cellSize} cellGutter = {this.state.cellGutter}/>
        </div>
      </div>
    );
  }
}

export default App;
