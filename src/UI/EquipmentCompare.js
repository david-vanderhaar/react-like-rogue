import React, { Component } from 'react';
import { focusOnGameWindow, cloneTiles } from '../Helper';
import { Card } from 'react-materialize';
import Materialize from 'materialize-css';

class EquipmentCompare extends Component {
  // compares stats of current equipment slot and this esuipment slot
  // prompts user to replace current equipment slot

  onEquipHandler(tileTs, equipmentItemList, player) {
    tileTs = cloneTiles(tileTs);
    equipmentItemList = equipmentItemList.concat();
    player = {...player};
    for (let i = 0; i < equipmentItemList.length; i++) {
      equipmentItemList[i] = {...equipmentItemList[i]}; //copy the Object
      if (equipmentItemList[i].id === this.props.equipmentCompareItemId) {
        if (equipmentItemList[i].canEquip(player)) {
          equipmentItemList[i].taken = true;
          player.equipment.push({...equipmentItemList[i]});

          tileTs[equipmentItemList[i].posY][equipmentItemList[i].posX].containsPickUp = false;
          tileTs[equipmentItemList[i].posY][equipmentItemList[i].posX].pickUpId = null; //reset current tile
        } else {
          Materialize.toast('Cannot equip', 4000)
        }
      }
    }

    this.props.handleUpdateEquipmentItems(tileTs, equipmentItemList);
    this.props.handlePlayerUpdate(player);

    this.props.toggleEquipmentCompare(false)
    focusOnGameWindow();
  }

  onSwapHandler(tileTs, equipmentItemList, player, currentItem) {
    tileTs = cloneTiles(tileTs);
    equipmentItemList = equipmentItemList.concat();
    player = {...player};
    currentItem = {...currentItem};
    let willSwap = false;
    let equipmentCompareItemId;

    for (let i = 0; i < equipmentItemList.length; i++) {
      equipmentItemList[i] = {...equipmentItemList[i]}; //copy the Object
      if (equipmentItemList[i].id === this.props.equipmentCompareItemId) {
        willSwap = true;

        // drop current item
        currentItem.posX = equipmentItemList[i].posX;
        currentItem.posY = equipmentItemList[i].posY;
        currentItem.taken = false;
        player.equipment = player.equipment.filter(item => item.id !== currentItem.id);
        equipmentCompareItemId = currentItem.id;


        tileTs[equipmentItemList[i].posY][equipmentItemList[i].posX].containsPickUp = true;
        tileTs[equipmentItemList[i].posY][equipmentItemList[i].posX].pickUpId = currentItem.id;

        // pick up new item
        equipmentItemList[i].taken = true;
        player.equipment.push({...equipmentItemList[i]});
      }
    }

    if (willSwap) {
      equipmentItemList.push(currentItem)
    }

    this.props.handleUpdateEquipmentCompareItemId(equipmentCompareItemId);
    this.props.handleUpdateEquipmentItems(tileTs, equipmentItemList);
    this.props.handlePlayerUpdate(player);

    focusOnGameWindow();
  }

  render() {
    let itemToEquip = this.props.equipmentItemList.filter(item => item.id === this.props.equipmentCompareItemId)[0];
    let currentItem = null

    if (itemToEquip && !itemToEquip.canEquip(this.props.player)) {
      currentItem = this.props.player.equipment.filter(item => item.type === itemToEquip.type)[0];
    }

    let cardActions = [];

    if (currentItem === null) {
      cardActions.push(<button key="1" className="btn" onClick={() => {this.onEquipHandler(this.props.tileTypes, this.props.equipmentItemList, this.props.player)}}>Equip</button>)
    } else {
      cardActions.push(<button key="2" className="btn" onClick={() => {this.onSwapHandler(this.props.tileTypes, this.props.equipmentItemList, this.props.player, currentItem)}}>Swap</button>)
    }

    cardActions.push(<button key="3" className="btn" onClick={() => {this.props.toggleEquipmentCompare(false)}}>Ignore</button>);

    return (
      <div className="EquipmentCompare">
        <Card
          title=''
          actions={cardActions}
        >
          <div className="row">
            <div className="col s6">
              <p className="flow-text">Ground</p>
              <p className="flow-text">
                {
                  itemToEquip &&
                    itemToEquip.name
                }
              </p>
              <div className="grey left center-align item-compare-card">
                {
                  itemToEquip &&
                    itemToEquip.id
                }
              </div>
              <ul className="center">
                <li>Attack: {itemToEquip.attack}</li>
                <li>Defense: {itemToEquip.defense}</li>
              </ul>
            </div>
            <div className="col s6">
              <p className="flow-text">Equipped</p>
              <p className="flow-text">
                {
                  currentItem ? currentItem.name : "None"
                }
              </p>
              <div className="grey right center-align item-compare-card">
                {
                  currentItem &&
                    currentItem.id
                }
              </div>
              {
                currentItem &&
                (
                  <ul className="center">
                    <li>Attack: {currentItem.attack}</li>
                    <li>Defense: {currentItem.defense}</li>
                  </ul>
                )
              }
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default EquipmentCompare;
