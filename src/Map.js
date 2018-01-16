import React, { Component } from 'react';
import { getRandomIntInclusive, doesCollide, cloneTiles } from './Helper'
import { CreateTile } from './Classes';

// function TileDisplay(props) {
//   return (
//     <span className={props.className} style={props.style}>
//       {props.value}
//     </span>
//   );
// }

class TileDisplay extends Component {
  shouldComponentUpdate(nextProps) {
    // REPLACE with a deep compare of props objects
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props))
    }

    render() {
      console.log('rendering tile')
      return (
        <span className={this.props.className} style={this.props.style}>
          {this.props.value}
        </span>
      );
    }
}

class Map extends Component {
  generateRooms() {
      let killCount = 0 // to prevent infinite loops
      let rooms = [];
      for (let i = 0; i < this.props.roomCount; i++) {
          killCount++
          let room = {};

          room.x = getRandomIntInclusive(1, this.props.mapWidth - this.props.maxRoomSize - 1);
          room.y = getRandomIntInclusive(1, this.props.mapHeight - this.props.maxRoomSize - 1);
          room.w = getRandomIntInclusive(this.props.minRoomSize, this.props.maxRoomSize);
          room.h = getRandomIntInclusive(this.props.minRoomSize, this.props.maxRoomSize);

          if (killCount <= 100) {
            if (doesCollide(rooms, room, i)) {
              i--;
              continue;
            }
            rooms.push(room);
          }

      }
      this.props.generateRooms(rooms)
      this.carveRooms(rooms)
  }

  carveRooms(rooms) {
      let playerPosX = 0;
      let playerPosY = 0;
      // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
      let tileTs = cloneTiles(this.props.tileTypes)

      for (let g = 0; g < rooms.length; g++) {
        // carve floors
        for (let j = rooms[g].y; j < rooms[g].y + rooms[g].h; j++) {
          for (let k = rooms[g].x; k < rooms[g].x + rooms[g].w; k++) {
            if (j < this.props.mapHeight && j > 0) {
              if (k < this.props.mapWidth && k > 0) {

                tileTs[j][k] = CreateTile({type: 'GROUND', canPass: true, containsDestructible: false});

                // Set player position within the last ground tile of the room
                playerPosX = k;
                playerPosY = j;

              }
            }
          }
        }
      }
      this.props.carveRooms(tileTs, playerPosX, playerPosY);

      this.carveHalls(rooms, tileTs);

  }

  carveHalls(rooms, tileTypes) {
      let tileTs = tileTypes;
      for (let i = 0; i < rooms.length; i++) {
        let roomA = rooms[i];
        let roomB = i === rooms.length - 1 ? rooms[0] : rooms[i + 1]; // This will ensure that all rooms are connected via chain
        // let roomB = findClosestRoom(roomA, rooms); // This connects closets rooms to each other, but some rooms may be unreachable
        let pointA = {
          x: getRandomIntInclusive(roomA.x, roomA.x + roomA.w),
          y: getRandomIntInclusive(roomA.y, roomA.y + roomA.h)
        };
        let pointB = {
          x: getRandomIntInclusive(roomB.x, roomB.x + roomB.w),
          y: getRandomIntInclusive(roomB.y, roomB.y + roomB.h)
        };
        while ((pointB.x !== pointA.x) || (pointB.y !== pointA.y)) {
          if (pointB.x !== pointA.x) {
            if (pointB.x > pointA.x) pointB.x--;
            else pointB.x++;
          }
          else if (pointB.y !== pointA.y) {
            if (pointB.y > pointA.y) pointB.y--;
            else pointB.y++;
          }

          tileTs[pointB.y][pointB.x] = CreateTile({type: 'GROUND', canPass: true, containsDestructible: false});

        }

      }
      this.props.carveHalls(tileTs);
      this.placeEnemies(tileTs);
  }

  placeEnemies(tileTypes) {
    let enemies = this.props.enemyList.concat();
    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
    let tileTs = cloneTiles(tileTypes)

    for (let i = 0; i < enemies.length; i++) {
      let placeX = getRandomIntInclusive(0, this.props.mapWidth - 1)
      let placeY = getRandomIntInclusive(0, this.props.mapHeight - 1)

      let tile = tileTs[placeY][placeX];
      if (tile.canPass) {
        enemies[i] = {...enemies[i]}
        tileTs[placeY][placeX].canPass = false;
        tileTs[placeY][placeX].containsDestructible = true;
        tileTs[placeY][placeX].destructible = enemies[i];
        enemies[i].posX = placeX;
        enemies[i].posY = placeY;
      } else {
        i--;
      }
    }
    this.props.placeEnemies(enemies, tileTs);
  }

  componentDidMount() {
    this.generateRooms();
  }
  render() {
    let tileCount = 0;
    let isEndRow = false;
    let style = {
      top: 0,
      left: 0,
      width: this.props.cellSize,
      height: this.props.cellSize
    };
    const tiles = this.props.tileMap.map((row, i) => {
      return (
        row.map((col, j) => {
          tileCount += 1;
          isEndRow = (tileCount) % this.props.mapWidth === 0 ? true : false;
          style = {
            top: i * (this.props.cellSize + this.props.cellGutter),
            left: j * (this.props.cellSize + this.props.cellGutter),
            width: this.props.cellSize,
            height: this.props.cellSize
          }
          return (
            <TileDisplay key={tileCount} className={this.props.tileTypes[i][j].cssClass()} value={col} isEndRow={isEndRow} style={style}/>
          )
        })
      );
    });
    return (
      <div className="Map">
        {tiles}
      </div>
    );
  }
}

export default Map;
