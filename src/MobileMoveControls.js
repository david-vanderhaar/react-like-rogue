import React, { Component } from 'react';

class MobileMoveControls extends Component {

  render() {
    return (
      <div className="MobileMoveControls">
        <span id="mobile-move-left" onClick={() => {this.props.onLeft()}}>
          <i className="fas fa-caret-left" aria-hidden="true"></i>
        </span>
        <span id="mobile-move-right" onClick={() => {this.props.onRight()}}>
          <i className="fas fa-caret-right" aria-hidden="true"></i>
        </span>
        <span id="mobile-move-up" onClick={() => {this.props.onUp()}}>
          <i className="fas fa-caret-up" aria-hidden="true"></i>
        </span>
        <span id="mobile-move-down" onClick={() => {this.props.onDown()}}>
          <i className="fas fa-caret-down" aria-hidden="true"></i>
        </span>
      </div>
    );
  }
}

export default MobileMoveControls;
