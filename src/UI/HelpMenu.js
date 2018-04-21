import React, { Component } from 'react';
import { Card, Collapsible, CollapsibleItem } from 'react-materialize';

class HelpMenu extends Component {
  render() {

    let cardActions = [];
    // cardActions.push(<button className="btn" onClick={() => {this.props.resetGame()}}>Restart</button>);
    // cardActions.push(<button className="btn" onClick={() => {this.props.resetGame()}}>Tweet</button>);

    return (
      <div className="HelpMenu card-prompt">
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
            <Collapsible accordion defaultActiveKey={1}>
              <CollapsibleItem header='Controls'>
                Lorem ipsum dolor sit amet.
              </CollapsibleItem>
              <CollapsibleItem header='Combat'>
                Lorem ipsum dolor sit amet.
              </CollapsibleItem>
              <CollapsibleItem header='Items'>
                Lorem ipsum dolor sit amet.
              </CollapsibleItem>
            </Collapsible>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default HelpMenu;
