import React, { Component } from 'react';
import * as SoundPlayer from '../SoundPlayer';
import { focusOnGameWindow, cloneTiles } from '../Helper';
import { getSvg } from '../SVGGenerator';
import { Card } from 'react-materialize';
import Materialize from 'materialize-css';
import Parser from 'html-react-parser';

class EquipmentCard extends Component {
  render() {
    return (
      <div className="EquipmentCard row">
        <div className="col s12">
          <span className="slot-name">{this.props.name}</span>
          {(this.props.piece) && (
            <div>
            <h4 className="grey-text text-lighten-2"> {this.props.piece.name} </h4>
            <div className={this.props.name}>
              <div className="equipment-stats">
                <span>Attack: {this.props.piece.attack}</span>
                <br />
                <span>Defense: {this.props.piece.defense}</span>
              </div>
              {Parser(getSvg(this.props.piece.svgReference, 'none', '60px'))}
            </div>
            <button className='btn red' onClick={() => {this.props.drop(this.props.piece)}}>Drop</button>
            </div>
          )}
          {!(this.props.piece) && (
            <h4 className="grey-text text-lighten-2"> Empty </h4>
          )}
        </div>
      </div>
    )
  }
}

class EquipmentManagement extends Component {

  onDropHandler(currentItem) {
    let tileTs = cloneTiles(this.props.tileTypes);
    let equipmentItemList = this.props.equipmentItemList.concat();
    let player = {...this.props.player};
    currentItem = {...currentItem};

    // drop current item
    currentItem.posX = player.posX;
    currentItem.posY = player.posY;
    currentItem.taken = false;
    player.equipment = player.equipment.filter(item => item.id !== currentItem.id);

    tileTs[player.posY][player.posX].containsPickUp = true;
    tileTs[player.posY][player.posX].pickUpId = currentItem.id;

    equipmentItemList.push(currentItem)

    this.props.handleUpdateEquipmentItems(tileTs, equipmentItemList);
    this.props.handlePlayerUpdate(player);

    focusOnGameWindow();
  }

  render() {
    let cardActions = [];
    cardActions.push(<button key="1" className="btn" onClick={() => {this.props.toggleEquipmentManagement(); focusOnGameWindow()}}>Close</button>);

    let armor_head = this.props.player.equipment.filter((item) => {
      return item.type === 'armor_head';
    }).pop();
    let armor_torso = this.props.player.equipment.filter((item) => {
      return item.type === 'armor_torso';
    }).pop();
    let armor_foot = this.props.player.equipment.filter((item) => {
      return item.type === 'armor_foot';
    }).pop();
    let weapon = this.props.player.equipment.filter((item) => {
      return item.type === 'weapon';
    }).pop();

    return (
      <div className="EquipmentManagement card-prompt">
        <Card
          title=''
          actions={cardActions}
        >
          <h1>Equipment</h1>
          <div className="row">
            <div className="col s12 m6">
              <EquipmentCard drop={this.onDropHandler.bind(this)} name='Head' piece={armor_head} />
              <EquipmentCard drop={this.onDropHandler.bind(this)} name='Torso' piece={armor_torso} />
              <EquipmentCard drop={this.onDropHandler.bind(this)} name='Feet' piece={armor_foot} />
            </div>
            <div className="col s12 m6">
              <EquipmentCard drop={this.onDropHandler.bind(this)} name='Weapon' piece={weapon} />
            </div>
          </div>

        </Card>
      </div>
    );
  }
}

export default EquipmentManagement;
