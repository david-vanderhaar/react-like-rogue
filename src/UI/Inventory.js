import React, { Component } from 'react';
import { getSvg } from '../SVGGenerator';

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

  componentDidMount() {
    document.getElementById(this.props.item.id + '-item').innerHTML = getSvg(this.props.item.svgReference, 'none', 35);
  }

  render() {
    return (
      <div className="InventoryItem">
        <div
          id={this.props.item.id + '-item'}
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
