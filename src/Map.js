import React, { Component } from 'react';

function Tile(props) {
  return (
    <span className={props.type} style={props.style}>
      {props.value}
    </span>
  );
}

class Map extends Component {
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
            <Tile key={tileCount} type={this.props.tileTypes[i][j]['type']} value={col} isEndRow={isEndRow} style={style}/>
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
