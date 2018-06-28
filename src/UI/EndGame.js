import React, { Component } from 'react';
import * as SoundPlayer from '../SoundPlayer';
import { Card } from 'react-materialize';

class EndGame extends Component {
  render() {

    let tweetText = "https://twitter.com/intent/tweet?text="
    tweetText += "I made it to dungeon level " + this.props.dungeonLevel + ". How far can you go?".split(' ').join('%20')

    let cardActions = [];
    cardActions.push(
      <button
        key="1"
        className="btn"
        onClick={() => {
          this.props.resetGame();
          SoundPlayer.playNextDungeon();
        }}
      >
        Restart
      </button>
  );
    cardActions.push(
      <a
        key="2"
        className="btn twitter-share-button"
        href={tweetText}
        target="_blank"
      >
        <span className="fab fa-twitter"></span> Tweet
      </a>
    );

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
          <div className="row">
          <div className="col s6 flow-text">
              You will forever sleep in dungeon level {this.props.dungeonLevel}
            </div>
            <div className="col s6 flow-text">
              You defeated {this.props.defeatedEnemyList.length} monsters.
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default EndGame;
