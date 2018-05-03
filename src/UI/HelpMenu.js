import React, { Component } from 'react';
import { Card, Collapsible, CollapsibleItem } from 'react-materialize';

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
            <CollapsibleItem header='Controls'>
              <div className="row">
                <div className="col s12 center">
                  Movement - with arrow keys
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
                        <td className="center"><span className="fa fa-circle"></span></td>
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
          </Collapsible>
          </div>
        </div>
      </Card>
    )

    return (
      <div className="HelpMenu card-prompt">
        <button
          className="btn btn-help-menu"
          onClick={() => {this.props.toggleHelpMenu()}}
        >
          Help
        </button>

        { helpMenu }

      </div>
    );
  }
}

export default HelpMenu;
