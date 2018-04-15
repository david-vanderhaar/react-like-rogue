import React, { Component } from 'react';

class SessionStats extends Component {
  render() {

    return (
      <div className="SessionStats">
        <div className="row">
          <div className="col s5"><span>Dungeon Level: {this.props.currentState.dungeonLevel}</span></div>
          <div className="col s2"></div>
          <div className="col s5"><span>Monsters Defeated: {this.props.currentState.defeatedEnemyList.length}</span></div>
        </div>
      </div>
    );
  }
}

export default SessionStats;
