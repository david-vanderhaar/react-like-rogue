import React, { Component } from 'react';
import { Card } from 'react-materialize';
import { dungeonDescriptionGenerator } from '../Generators/Dungeons/generator';

class EndDungeonSummary extends Component {
  render() {

    let tweetText = "https://twitter.com/intent/tweet?text="
    tweetText += "Currently on dungeon level " + this.props.dungeonLevel + ". How far can you go?".split(' ').join('%20')

    let cardActions = [];
    cardActions.push(<button key="1" className="btn" onClick={() => {this.props.goToDungeonLevel()}}>Next Dungeon</button>);
    cardActions.push(<button key="2" className="btn" onClick={() => {
      this.props.saveGame();
      this.props.goToDungeonLevel();
    }}>Save</button>);
    cardActions.push(
      <a
        key="3"
        className="btn twitter-share-button"
        href={tweetText}
        target="_blank"
      >
        <span className="fab fa-twitter"></span> Tweet
      </a>
    );

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
