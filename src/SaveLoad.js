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

  deleteSave(index) {
    let saves = this.state.saves.concat().splice(index - 1 , 1);
    this.setState({
      saves
    }, () => {
      localStorage.setItem('react-like-rogue-game-saves', JSON.stringify(this.state.saves));
    });
  }

  render() {
    let cardActions = [];
    cardActions.push(<button key="1" className="btn" onClick={() => {this.props.toggleSaveLoad()}}>Close</button>);

    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    let saves = this.state.saves && this.state.saves.length > 0 ? this.state.saves.map((save, index) => {
       return (
        <div key={index} className="row">
          <button key={index} className="btn" onClick={() => {
            this.loadGame(save);
            this.props.toggleSaveLoad();
          }}>
            {new Date(save.date).toLocaleDateString('en-EN', dateOptions)}
          </button>
          <button key={index.toString() + 'delete'} className="btn red" onClick={() => {
            this.deleteSave(index);
          }}>
            <i className="fas fa-trash-alt" aria-hidden="true"></i>
          </button>
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
