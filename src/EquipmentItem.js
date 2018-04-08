import React, { Component } from 'react';

class EquipmentItem extends Component {
  render() {
    const style = {
      top: this.props.equipmentItem.posY * (this.props.cellSize + this.props.cellGutter),
      left: this.props.equipmentItem.posX * (this.props.cellSize + this.props.cellGutter),
      width: this.props.cellSize,
      height: this.props.cellSize,
    };
    return (
      <div className="EquipmentItem">
        <span className="item grey white-text" style={style}>
          {this.props.equipmentItem.type}
        </span>
      </div>
    );
  }
}

export default EquipmentItem;
