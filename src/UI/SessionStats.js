import React, { Component } from 'react';

class SessionStats extends Component {
  render() {

    return (
      <div>
        <div className="SessionStats">
          <div className="row">
            <div className="col s5"><span><i className="fa fa-chess-rook" aria-hidden="true"></i> Level {this.props.currentState.dungeonLevel}</span></div>
            <div className="col s2"></div>
            <div className="col s5"><span><i className="fa fa-skull" aria-hidden="true"></i> Defeated {this.props.currentState.defeatedEnemyList.length}</span></div>
          </div>
        </div>

        <div className="SessionStats-mobile">
          <div className="row">
            <div className="col s12 grey-text text-lighten-2">
              <i className="fa fa-heart red-text" aria-hidden="true"></i> {this.props.currentState.player.life}
            </div>
            <div className="col s12 grey-text text-lighten-2">
              <i className="fa fa-shield-alt blue-text" aria-hidden="true"></i> {this.props.currentState.player.calculateStat('defense')}
            </div>
            <div className="col s12 grey-text text-lighten-2">
              <i className="fa fa-gavel green-text" aria-hidden="true"></i> {this.props.currentState.player.calculateStat('attack')}
            </div>
          </div>
          <div className="row">
            <div className="col s12"><span><i className="fa fa-chess-rook" aria-hidden="true"></i> {this.props.currentState.dungeonLevel}</span></div>
            <div className="col s12"><span><i className="fa fa-skull" aria-hidden="true"></i> {this.props.currentState.defeatedEnemyList.length}</span></div>
          </div>
        </div>

      </div>
    );
  }
}

export default SessionStats;
