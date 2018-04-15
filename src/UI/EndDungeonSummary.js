import React, { Component } from 'react';
import { Card } from 'react-materialize';

class EndDungeonSummary extends Component {
  render() {

    let cardActions = [];
    cardActions.push(<button className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Next Dungeon</button>);
    cardActions.push(<button className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Save</button>);
    cardActions.push(<button className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Tweet</button>);

    return (
      <div className="EndDungeonSummary">
        <Card
          title=''
          actions={cardActions}
        >
          <div className="row">
            <h1 className="title">Good Job!</h1>
            <span className="quote">Let's get to the next dungeon.</span> 
          </div>
        </Card>
      </div>
    );
  }
}

export default EndDungeonSummary;
