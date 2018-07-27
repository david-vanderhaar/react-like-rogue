import React, { Component } from 'react';
import { Card, Collapsible, CollapsibleItem } from 'react-materialize';
import VolumeControl from './VolumeControl';

class HelpMenu extends Component {
  render() {

    let cardActions = [];
    cardActions.push(<button key='1' className="btn" onClick={() => {this.props.toggleHelpMenu()}}>Close</button>);

    let helpMenu = this.props.showHelpMenu && (
      <Card
        title=''
        actions={cardActions}
      >
        <div className="row">
          <h1 className="title">Help Menu</h1>
          <span className="quote flow-text"></span>
        </div>
        <div className="row">
          <div className="col s12 flow-text">
          <Collapsible accordion defaultActiveKey={0}>
          <CollapsibleItem header='Goal'>
            <p>
              Explore the dungeon to reach the lowest level possible while defeating as many monsters as you can.
              <br />
              How <span className="teal-text text-lighten-2">far down</span> will you go? How many <span className="teal-text text-lighten-2">foes</span> will you <span className="teal-text text-lighten-2">fell</span>?
            </p>
          </CollapsibleItem>
            <CollapsibleItem header='Controls'>
              <div className="row">
                <div className="col s12 center">
                  Move with arrow keys <br />
                  Spacebar to rest
                </div>
              </div>
              <div className="row">
                <div className="col s10 offset-s1">
                  <table>
                    <tbody>
                      <tr>
                        <td className="center"></td>
                        <td className="center"><span className="fa fa-arrow-up"></span></td>
                        <td className="center"></td>
                      </tr>
                      <tr>
                        <td className="right"><span className="fa fa-arrow-left"></span></td>
                        <td className="center"><span className="fa fa-genderless"></span></td>
                        <td className="left"><span className="fa fa-arrow-right"></span></td>
                      </tr>
                      <tr>
                        <td className="center"></td>
                        <td className="center"><span className="fa fa-arrow-down"></span></td>
                        <td className="center"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapsibleItem>
            <CollapsibleItem header='Combat'>
              Bump enemies to damage them.
            </CollapsibleItem>
            <CollapsibleItem header='Items'>
              Click items to use them.
              <br />
              You may only have one of each type of equipment at a time.
            </CollapsibleItem>
            <CollapsibleItem header='Sounds'>
              <VolumeControl
                masterVolume={this.props.masterVolume}
                updateMasterVolume={this.props.updateMasterVolume.bind(this)}
                soundtrackVolume={this.props.soundtrackVolume}
                updateSoundtrackVolume={this.props.updateSoundtrackVolume.bind(this)}
                playSoundTrack = {this.props.playSoundTrack.bind(this)}
                pauseSoundTrack = {this.props.pauseSoundTrack.bind(this)}
              />
            </CollapsibleItem>
            <CollapsibleItem header='Tips'>
              <div className="left-align">
                - Every level contains a powerful potion.<br/>
                - Don't get cornered!<br/>
                - Find the best equipment from each level.<br/>
                - Use the stairs to skip ahead to the next level.<br/>
              </div>
            </CollapsibleItem>
          </Collapsible>
          </div>
        </div>
      </Card>
    )

    return (
      <div className="HelpMenu card-prompt">
        { helpMenu }
      </div>
    );
  }
}

export default HelpMenu;
