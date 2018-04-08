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
