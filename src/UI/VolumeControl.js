import React, { Component } from 'react';

class VolumeControl extends Component {
  render() {

    return (
      <div className="VolumeControl">
        Master Volume
        <input
          id="master-volume"
          type="range"
          min="1"
          max="100"
          defaultValue={this.props.masterVolume}
          onChange={(event) => {
            this.props.updateMasterVolume(event.target.value)
          }}
        />
        Soundtrack Volume
        <input
          id="soundtrack-volume"
          type="range"
          min="1"
          max="100"
          defaultValue={this.props.soundtrackVolume}
          onChange={(event) => {
            this.props.updateSoundtrackVolume(event.target.value)
          }}
        />
        <br />
        <button
          className='btn'
          onClick={() => {
            this.props.playSoundTrack();
          }}
        >
          Play Music
        </button>
        <button
          className='btn'
          onClick={() => {
            this.props.pauseSoundTrack();
          }}
        >
          Pause Music
        </button>
      </div>
    );
  }
}

export default VolumeControl;
