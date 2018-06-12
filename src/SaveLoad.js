import React, { Component } from 'react';
import { Card } from 'react-materialize';

class SaveLoad extends Component {

  constructor() {
    super();
    const saves = JSON.parse(localStorage.getItem('react-like-rogue-game-saves'));

    this.state = {
      saves: saves
    }
  }

  loadGame(previousSave) {
    this.props.handleLoadGame(previousSave.state);
  }

  render() {
    let cardActions = [];
    cardActions.push(<button key="1" className="btn" onClick={() => {this.props.toggleSaveLoad()}}>Close</button>);

    console.log(this.state.saves && this.state.saves.length > 0)
    console.log(this.state.saves)

    let saves = this.state.saves && this.state.saves.length > 0 ? this.state.saves.map((save, index) => {
       return (
        <div key={index} className="row">
          <button key={index} className="btn" onClick={() => {
            this.loadGame(save);
            this.props.toggleSaveLoad();
          }}>Save {index + 1} {save.date}</button>
        </div>
      )
    }) :  (
      <h2 className="title"> Empty </h2>
    );

    let saveLoad = this.props.showSaveLoad && (
      <div className="card-prompt">
        <Card
          title=''
          actions={cardActions}
        >
          <div className="row">
            <h1 className="title">Saves</h1>
            {saves}
          </div>
        </Card>
      </div>
    );
    return (
      <div className="SaveLoad">
        {saveLoad}
      </div>
    );
  }
}

export default SaveLoad;
