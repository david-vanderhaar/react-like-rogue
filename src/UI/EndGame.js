import React, { Component } from 'react';
import { Card } from 'react-materialize';

class EndGame extends Component {
  render() {

    let cardActions = [];
    cardActions.push(<button className="btn" onClick={() => {this.props.resetGame()}}>Restart</button>);
    cardActions.push(<button className="btn" onClick={() => {this.props.resetGame()}}>Tweet</button>);

    return (
      <div className="EndGame card-prompt">
        <Card
          title=''
          actions={cardActions}
        >
          <div className="row">
            <h1 className="title">You have fallen!</h1>
            <span className="quote flow-text"></span>
          </div>
        </Card>
      </div>
    );
  }
}

export default EndGame;
