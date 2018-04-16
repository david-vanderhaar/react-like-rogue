import React, { Component } from 'react';
import { Card } from 'react-materialize';
import { dungeonDescriptionGenerator } from '../Generators/Dungeons/generator';

class EndDungeonSummary extends Component {
  render() {

    let cardActions = [];
    cardActions.push(<button className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Next Dungeon</button>);
    cardActions.push(<button className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Save</button>);
    cardActions.push(<button className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Tweet</button>);

    return (
      <div className="EndDungeonSummary card-prompt">
        <Card
          title=''
          actions={cardActions}
        >
          <div className="row">
            <h1 className="title">On to the next Dungeon!</h1>
            <span className="quote flow-text">{dungeonDescriptionGenerator()}</span>
          </div>
        </Card>
      </div>
    );
  }
}

export default EndDungeonSummary;
