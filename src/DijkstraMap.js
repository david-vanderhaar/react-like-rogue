import React, { Component } from 'react';

class DijkstraMap extends Component {
  getNeigbors(target, dijkstraMap) {
    let neighbors = [];
    let minX = 0;
    let maxX = dijkstraMap[target.posY].length;
    let minY = 0;
    let maxY = dijkstraMap.length;
    // right
    if (target.posX + 1 <= maxX) {
      if (dijkstraMap[target.posY][target.posX + 1] !== 'ignore') {
        neighbors.push({posX: target.posX + 1, posY: target.posY, cost: dijkstraMap[target.posY][target.posX + 1]});
      }
    }
    // up
    if (target.posY - 1 >= minY) {
      if (dijkstraMap[target.posY - 1][target.posX] !== 'ignore') {
        neighbors.push({posX: target.posX, posY: target.posY - 1, cost: dijkstraMap[target.posY - 1][target.posX]});
      }
    }
    //left
    if (target.posX - 1 >= minX) {
      if (dijkstraMap[target.posY][target.posX - 1] !== 'ignore') {
        neighbors.push({posX: target.posX - 1, posY: target.posY, cost: dijkstraMap[target.posY][target.posX - 1]});
      }
    }
    //down
    if (target.posY + 1 <= maxY) {
      if (dijkstraMap[target.posY + 1][target.posX] !== 'ignore') {
        neighbors.push({posX: target.posX, posY: target.posY + 1, cost: dijkstraMap[target.posY + 1][target.posX]});
      }
    }
    // sort by value
    neighbors.sort((a, b) => {
      return a.cost - b.cost;
    });

    return neighbors;
  }
  generateDijkstraMap(tileTypes, goalPositions) {
    // copy dijkstra map
    let dijkstraMap = this.props.dijkstraMap.concat();
    for (let i = 0; i < dijkstraMap.length; i++) {
      dijkstraMap[i] = dijkstraMap[i].concat();
      for (let j = 0; j < dijkstraMap[i].length; j++) {
        if (tileTypes[i][j].type === 'WALL') {
          dijkstraMap[i][j] = 'ignore'
        } else {
          dijkstraMap[i][j] = 100;
        }
      }
    }
    // set goals to 0
    goalPositions.forEach((goal) => {
      dijkstraMap[goal.posY][goal.posX] = 0;
    });

    // iterate through map to generate dijkstra paths
    // while map
    let continueCalculation = true;
    let count = 0
    while (continueCalculation === true) {
      count += 1;
      continueCalculation = false;
      for (let i = 0; i < dijkstraMap.length; i++) {
        for (let j = 0; j < dijkstraMap[i].length; j++) {
          let current = {posX: j, posY: i, cost: dijkstraMap[i][j]};
          if (current.cost !== 'ignore') {
            let neighbors = this.getNeigbors(current, dijkstraMap);

            if (neighbors.length > 0) {
              if (current.cost > neighbors[0].cost + 2) {
                dijkstraMap[i][j] = neighbors[0].cost + 1;
                continueCalculation = true;
              }
            }
          }
        }
      }
      if (count > 100) { // catch a runaway loop
        continueCalculation = false;
      }
    }
    // pass new dijkstraMap to app state
    this.props.handleGenerateDijkstraMap(dijkstraMap);
  }

  componentWillMount() {
    this.generateDijkstraMap(this.props.tileTypes, this.props.goalPositions)
  }
  render() {
    let tileCount = 0;
    const tiles = this.props.dijkstraMap.map((row, i) => {
      if (this.props.showDijkstraMap) {
        return (
          row.map((col, j) => {
            tileCount += 1;
            let cost = this.props.dijkstraMap[i][j];
            let color = cost !== 'ignore' ? ('hsla(' + (360 * (cost/90)) + ',' + 50 + '%,' + 50 + '%, 1)') : 'hsla(360, 100%, 100%, 0)'
            let style = {
              top: i * (this.props.cellSize + this.props.cellGutter),
              left: j * (this.props.cellSize + this.props.cellGutter),
              width: this.props.cellSize,
              height: this.props.cellSize,
              backgroundColor: color,
            }
            return (
              <div
              key={tileCount}
              value={col}
              style={style}
              className="tile tile-Dijkstra"
              >
              {cost}
              </div>
            )
          })
        );
      } else {
        return null;
      }
    });
    return (
      <div className="DijkstraMap">
        {tiles}
        <button className="btn ctrl-btn" onClick={this.props.handleToggleDijkstraMap}>
          Toggle Dijkstra
        </button>
      </div>
    );
  }
}

export default DijkstraMap;
