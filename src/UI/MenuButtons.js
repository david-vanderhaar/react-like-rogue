import React, { Component } from 'react';
import { getSvg } from '../SVGGenerator';
import Parser from 'html-react-parser';

class MenuButtons extends Component {
  render() {
    return (
      <div>
        <div className="MenuButtons">
          <button className="btn btn-menu" onClick={this.props.toggleBattleSim}>
            Battle Simulation <i className="fas fa-calculator" aria-hidden="true"></i>
          </button>
          <button className="btn btn-menu" onClick={this.props.handleToggleDijkstraMap}>
            Toggle Dijkstra <i className="fa fa-map" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleHelpMenu()}}
          >
            Help <i className="fa fa-question-circle" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleEquipmentManagement()}}
          >
            Equipment {Parser(getSvg('equipment', 'none', '30px'))}
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleSaveLoad()}}
          >
            Load <i className="fa fa-load" aria-hidden="true"></i>
          </button>
        </div>

        <div className="MenuButtons-mobile">
          <button className="btn btn-menu" onClick={this.props.toggleBattleSim}>
            <i className="fas fa-calculator" aria-hidden="true"></i>
          </button>
          <button className="btn btn-menu" onClick={this.props.handleToggleDijkstraMap}>
            <i className="fa fa-map" aria-hidden="true"></i>
          </button>
          <button className="btn btn-menu" onClick={() => {this.props.toggleInventoryCard()}}>
            <i className="fa fa-flask" aria-hidden="true"></i>
            <span className="new badge red" data-badge-caption="">{this.props.inventoryCount}</span>
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleEquipmentManagement()}}
          >
            {Parser(getSvg('equipment', 'none', '30px'))}
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleHelpMenu()}}
          >
            <i className="fa fa-question-circle" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleSaveLoad()}}
          >
            <i className="fa fa-spinner" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default MenuButtons;
