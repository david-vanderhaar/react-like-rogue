import React, { Component } from 'react';
import * as SoundPlayer from './SoundPlayer';

class TitleScreen extends Component {
  constructor() {
    super();
    const sound = SoundPlayer.playTitle();
    this.state = {
      musicOn: true,
      titleTrack: sound,
      overlayTransition: '',
      transitionTime: 3000,
    }
  }

  toggleMusic() {
    if (this.state.musicOn) {
      this.state.titleTrack.mute(true);
    } else {
      this.state.titleTrack.mute(false);
    }
    this.setState({
      musicOn: !this.state.musicOn
    })
  }

  handleKey(event) {
    if (event.keyCode === 32) {
      this.goToGame();
    }
  }

  goToGame() {
    this.setState({
      overlayTransition: 'title-transition'
    });
    setTimeout(() => {
      window.location.hash = process.env.PUBLIC_URL + '/game';
    }, this.state.transitionTime + 500);
  }

  componentDidMount() {
    let el = document.getElementById("title-screen");
    if (el) {el.focus();}
  }

  render() {
    const musicStatus = this.state.musicOn ? (<i className="fa fa-volume-up"></i>) : (<i className="fa fa-volume-off"></i>);
    return (
      <div id="title-screen" className="TitleScreen" tabIndex="0" onKeyUp={this.handleKey.bind(this)}>
        <div className="game-name">
          React Like Rogue
          <div className="game-signature">A Game by Classic Wook</div>
        </div>
        <button className="key-prompt btn btn-large" onClick={() => {this.goToGame();}}>Press Space</button>
        <div
          className="music-toggle"
          onClick={this.toggleMusic.bind(this)}
        >
          { musicStatus }
        </div>
        <div id="title-transition-overlay" className={this.state.overlayTransition} style={{transition: this.state.transitionTime.toString() + 'ms ease-out'}} />
      </div>
    );
  }
}

export default TitleScreen
