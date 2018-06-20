import React, { Component } from 'react';
import * as SoundPlayer from '../SoundPlayer';
import { Card } from 'react-materialize';
import { getSvg } from '../SVGGenerator';
import Parser from 'html-react-parser';

class InventoryItem extends Component {

  useItem = () => {
    let item = {...this.props.item};
    let player = {...this.props.player};

    SoundPlayer.playDrink();
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
          id={this.props.item.id + '-item'}
          className="btn"
          onClick={this.useItem}
        >
          {Parser(getSvg(this.props.item.svgReference, 'none', 35))}
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

    let cardActions = [];
    cardActions.push(<button key="1" className="btn" onClick={() => {this.props.toggleInventoryCard()}}>Close</button>);

    let inventoryMobileCard = this.props.showInventoryCard && (
      <div className="Inventory-mobile card-prompt">
        <Card
          title=''
          actions={cardActions}
        >
          <div className="row">
            <h1 className="title">Inventory</h1>
            {inventory}
          </div>
        </Card>
      </div>
    );

    return (
      <div>
        <div className="Inventory">
          {inventory}
        </div>

        {inventoryMobileCard}

      </div>
    );
  }
}

export default Inventory;
