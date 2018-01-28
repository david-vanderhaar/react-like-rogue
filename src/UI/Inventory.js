import React, { Component } from 'react';

class InventoryItem extends Component {

  useItem = () => {
    let item = {...this.props.item};
    let player = {...this.props.player};

    item.usePickUp(player);

    player.inventory = player.inventory.filter((inventoryItem) => {
      if (inventoryItem.id === item.id) {
        return false;
      } else {
        return true;
      }
    });

    this.props.handlePlayerUpdate(player);
  }

  dropItem = () => {

  }

  render() {
    return (
      <div className="InventoryItem">
        <div
          className="btn"
          onClick={this.useItem}
        >
          {this.props.item.title}
        </div>
      </div>
    );
  }
}

class Inventory extends Component {
  render() {
    //Generate inventory
    const inventory = this.props.inventory.map((item) => {
      return (
        <InventoryItem
          key = {item.id}
          item = {item}
          handlePlayerUpdate = {this.props.handlePlayerUpdate}
          player = {this.props.player}
        />
      );
    });
    return (
      <div className="Inventory">
        {inventory}
      </div>
    );
  }
}

export default Inventory;
