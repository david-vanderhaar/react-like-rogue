import React, { Component } from 'react';

class MenuButtons extends Component {
  render() {
    return (
      <div>
        <div className="MenuButtons">
          <button className="btn btn-menu" onClick={this.props.handleToggleDijkstraMap}>
            Toggle Dijkstra <i className="fa fa-map" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleHelpMenu()}}
          >
            Help <i className="fa fa-question-circle" aria-hidden="true"></i>
          </button>
        </div>

        <div className="MenuButtons-mobile">
          <button className="btn btn-menu" onClick={this.props.handleToggleDijkstraMap}>
            <i className="fa fa-map" aria-hidden="true"></i>
          </button>
          <button className="btn btn-menu" onClick={() => {this.props.toggleInventoryCard()}}>
            <i className="fa fa-flask" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-menu"
            onClick={() => {this.props.toggleHelpMenu()}}
          >
            <i className="fa fa-question-circle" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default MenuButtons;
