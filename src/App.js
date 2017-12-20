import React, { Component } from 'react';
import Map from './Map';
import Player from './Player';
import './App.css';

class App extends Component {

  constructor() {
    super();
    // Map width/height control determine number of cells across/down the page
    const mapWidth = 48;
    const mapHeight = 16;
    const cellSize = 30; // pixel width/height of each cell
    const cellGutter = 4; // pixels between each cell

    //Dungeon Vars
    const roomCount = 8;
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
      tileTypes: Array(mapHeight).fill(Array(mapWidth).fill({type: 'tile tile-WALL'})),
      playerPosX: playerPosX,
      playerPosY: playerPosY,
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
		let tileTypes = this.state.tileTypes;
    switch (event.keyCode) {
      case playerControls['LEFT']:
        (playerPosX > 0 && tileTypes[playerPosY][playerPosX - 1].type !== 'tile tile-WALL') ? playerPosX -= 1 : playerPosX += 0;
        break;
      case playerControls['UP']:
        playerPosY > 0 && tileTypes[playerPosY - 1][playerPosX].type !== 'tile tile-WALL' ? playerPosY -= 1 : playerPosY += 0;
        break;
      case playerControls['RIGHT']:
        playerPosX < this.state.mapWidth - 1 && tileTypes[playerPosY][playerPosX + 1].type !== 'tile tile-WALL' ? playerPosX += 1 : playerPosX += 0;
        break;
      case playerControls['DOWN']:
        playerPosY < this.state.mapHeight - 1 && tileTypes[playerPosY + 1][playerPosX].type !== 'tile tile-WALL' ? playerPosY += 1 : playerPosY += 0;
        break;
      default:
        break;
    }

    this.setState({
      playerPosX: playerPosX,
      playerPosY: playerPosY,
    });
  }

  generateWalls() {
    let tileMap = this.state.tileMap;
    let tiles = [];

    for (let i = 0; i < tileMap.length; i++) {
      // console.log(i)
      tiles.push([]);
      for (let j = 0; j < tileMap[i].length; j ++) {
        // tileMap[i][j] = i.toString() + ', ' + j.toString();
        tiles[i].push('');
        // tiles[i].push(i.toString() + ',' + j.toString());
        // console.log(tileMap[i][j])
      }
    }

    this.setState({
      tileMap: tiles,
    });
  }

  generateRooms() {
      let rooms = this.state.rooms;
      let tileTypes = this.state.tileTypes;
      for (let i = 0; i < this.state.roomCount; i++) {
          let room = {};

          room.x = getRandomIntInclusive(1, this.state.mapWidth - this.state.maxRoomSize - 1);
          room.y = getRandomIntInclusive(1, this.state.mapHeight - this.state.maxRoomSize - 1);
          room.w = getRandomIntInclusive(this.state.minRoomSize, this.state.maxRoomSize);
          room.h = getRandomIntInclusive(this.state.minRoomSize, this.state.maxRoomSize);

          rooms.push(room);

      }
      this.setState({
        tileTypes: tileTypes,
        rooms: rooms
      });
  }

  carveRooms() {
			let playerPosX = 0;
			let playerPosY = 0;
      let rooms = this.state.rooms;
      let tileTs = this.state.tileTypes;
			tileTs = [];
			for (let q = 0; q < this.state.tileTypes.length; q++) {
				tileTs.push([]);
				for (let w = 0; w < this.state.tileTypes[q].length; w++) {
					tileTs[q].push({type: 'tile tile-WALL'});
				}
			}

      for (let g = 0; g < rooms.length; g++) {
        // carve floors
        for (let j = rooms[g].y; j < rooms[g].y + rooms[g].h; j++) {
					console.log(tileTs[j]);
          for (let k = rooms[g].x; k < rooms[g].x + rooms[g].w; k++) {
						console.log(tileTs[j][k]);
						console.log(j, k);
            if (j < this.state.mapHeight && j > 0) {
              if (k < this.state.mapWidth && k > 0) {
								tileTs[j][k] = {type: 'tile tile-GROUND'};

								// Set player position within the last ground tile of the room
								playerPosX = k;
								playerPosY = j;

              }
            }
          }
        }
      }
      this.setState({
        tileTypes: tileTs,
				playerPosX: playerPosX,
				playerPosY: playerPosY,
      });
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handlePlayerMove.bind(this));
    this.generateWalls()
    this.generateRooms();
    this.carveRooms();
  }

  render() {
    return (
      <div className="App">
        <div className="game-container">
          <Map mapWidth = {this.state.mapWidth} tileTypes = {this.state.tileTypes} tileMap = {this.state.tileMap} cellSize = {this.state.cellSize} cellGutter = {this.state.cellGutter}/>
          <Player playerPosX = {this.state.playerPosX} playerPosY = {this.state.playerPosY} cellSize = {this.state.cellSize} cellGutter = {this.state.cellGutter}/>
        </div>
      </div>
    );
  }
}

// Helper Functions
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

export default App;
