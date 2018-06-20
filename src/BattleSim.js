import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CreateActor } from './Classes';
import { getSvg } from './SVGGenerator';
import { getAllMonsterData } from './DB/monsters';
import Parser from 'html-react-parser';

class ActorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      life: this.props.actor.life,
      defense: this.props.actor.defense,
      attack: this.props.actor.attack,
    }
  }

  handleLifeChange(event) {
    this.setState({
      life: event.target.value
    }, () => {
      this.handleUpdateActor();

    });
  }
  handleDefenseChange(event) {
    this.setState({
      defense: event.target.value
    }, () => {
      this.handleUpdateActor();

    });
  }
  handleAttackChange(event) {
    this.setState({
      attack: event.target.value
    }, () => {
      this.handleUpdateActor();

    });
  }


  handleUpdateActor() {
    let life = this.state.life
    let defense = this.state.defense
    let attack = this.state.attack
    let actor = CreateActor({id: this.props.actor.id, name: 'Custom', life: parseInt(life), defense: parseInt(defense), attack: parseInt(attack) })
    this.props.updateActorStats(actor);
  }

  handleSelect(event) {
    let actor = CreateActor({
      id: this.props.actor.id,
      life: this.props.monsterData[event.target.value].stats.life,
      defense: this.props.monsterData[event.target.value].stats.defense,
      attack: this.props.monsterData[event.target.value].stats.attack,
      name: this.props.monsterData[event.target.value].stats.name,
      svgReference: this.props.monsterData[event.target.value].stats.svgReference,
    })
    this.props.updateActorStats(actor);
  }

  render() {
    let options = this.props.monsterData.map((monster, i) => {
      return (<option value={i}>{monster.stats.name}</option>)
    })
    return (
      <div className="col s6">
        <div className="grey-text text-lighten-2 center">{this.props.actor.id}</div>
        <h3 className="grey-text text-lighten-2 text center">{this.props.actor.name}</h3>
        <h3 className="grey-text text-lighten-2 text center">
          <div>
            <select onChange={this.handleSelect.bind(this)}>
              <option value="" disabled selected>Choose A Monster</option>
              {options}
            </select>
            <label>Monsters</label>
          </div>
        </h3>
        <div className="row">
          <span className="actor-display">{Parser(getSvg(this.props.actor.svgReference, 'black', 75))}</span>
        </div>

        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12 m4">
                <i className="fa fa-heart red-text prefix"></i>
                <input id="{this.props.actor.id}-life" type="number" onChange={this.handleLifeChange.bind(this)} value={this.props.actor.life} className="validate white-text" />
                <label className="white-text" htmlFor="{this.props.actor.id}-life">Life</label>
              </div>
              <div className="input-field col s12 m4">
                <i className="fa fa-shield-alt blue-text prefix"></i>
                <input id="{this.props.actor.id}-defense" type="number" onChange={this.handleDefenseChange.bind(this)} value={this.props.actor.defense} className="validate white-text" />
                <label className="white-text" htmlFor="{this.props.actor.id}-defense">Defense</label>
              </div>
              <div className="input-field col s12 m4">
                <i className="fa fa-gavel green-text prefix"></i>
                <input id="{this.props.actor.id}-attack" type="number" onChange={this.handleAttackChange.bind(this)} value={this.props.actor.attack} className="validate white-text" />
                <label className="white-text" htmlFor="{this.props.actor.id}-attack">Attack</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Results extends Component {
  render() {
    return (
      <div className="col s6">
        <div className="row center">
          <div className="grey-text text-lighten-2 center">{this.props.actor.id}</div>
          <h3 className="grey-text text-lighten-2 text center">{this.props.actor.name}</h3>
          <p className="grey-text text-lighten-2 results-wl">{this.props.results.wins} / {this.props.results.losses}</p>
          <p className="grey-text text-lighten-2 results-percent">{Math.round((this.props.results.wins/this.props.results.losses) * 100, 0)} %</p>
          <p className="grey-text text-lighten-2 results-wl">Kill / Death</p>
        </div>
      </div>
    )
  }
}

class BattleSim extends Component {

  constructor() {
    super();

    const simCount = 1000
    const actor_1 = CreateActor({id: 'actor_1', name: 'Player'});
    const actor_2 = CreateActor({id: 'actor_2', name: 'Player'});

    this.state = {
      simCount: simCount,
      battleCount: 0,
      actor_1: actor_1,
      actor_2: actor_2,
      results: {
        actor_1: {
          wins: 0,
          losses: 0,
        },
        actor_2: {
          wins: 0,
          losses: 0,
        }
      },
      monsters: getAllMonsterData(),
    }
  }

  simulate() {
    let results = {...this.state.results}
    let initialActor_1 = {...this.state.actor_1}
    let initialActor_2 = {...this.state.actor_2}
    let actor_1 = {...this.state.actor_1}
    let actor_2 = {...this.state.actor_2}

    let iteration = 0;
    let battleCount = 0;
    let kill_count = this.state.simCount * 2;
    // while iteration is less than simCount
    while (iteration < this.state.simCount) {
      let win = false;
      let kill_count_2 = 100;
      while (!win) {
        // actor 2 takes hit from actor 1
        actor_2.takeHit(actor_1.attack, false);
        // check for win
        if (actor_2.life <= 0) {
          results.actor_2.losses++
          results.actor_1.wins++
          win = true;
        }
        // same for actor 1
        actor_1.takeHit(actor_2.attack, false);
        if (actor_1.life <= 0) {
          results.actor_1.losses++
          results.actor_2.wins++
          win = true;
        }
      }
      actor_1.life = initialActor_1.life
      actor_1.defense = initialActor_1.defense
      actor_1.attack = initialActor_1.attack
      actor_2.life = initialActor_2.life
      actor_2.defense = initialActor_2.defense
      actor_2.attack = initialActor_2.attack
      // reset actor values to initial
      iteration++;
      battleCount++;
      if (iteration >= kill_count) { break; }
    }

    // set state results
    this.setState({
      results: results,
      battleCount: this.state.battleCount + battleCount
    });
  }

  resetResults() {
    this.setState({
      battleCount: 0,
      results: {
        actor_1: {
          wins: 0,
          losses: 0,
        },
        actor_2: {
          wins: 0,
          losses: 0,
        }
      }
    });
  }

  updateSimCount(event) {
    this.setState({
      simCount: event.target.value
    });
  }

  updateActorStats(actor) {
    if (actor.id === 'actor_1') {
      this.setState({
        actor_1: actor
      });
    } else {
      this.setState({
        actor_2: actor
      });
    }
  }

  render() {
    return (
      <div className="BattleSim">
        <h1 className="grey-text text-lighten-2 text center">Battle Simulator</h1>
        <div className="row">
          <ActorDisplay actor={this.state.actor_1} updateActorStats={this.updateActorStats.bind(this)} monsterData={this.state.monsters} />
          <ActorDisplay actor={this.state.actor_2} updateActorStats={this.updateActorStats.bind(this)} monsterData={this.state.monsters} />
        </div>
        <div className="row">
          <div className="col s12 center">
            <div className="input-field inline">
              <input id="simCount" type="number" defaultValue={this.state.simCount} onChange={this.updateSimCount.bind(this)} className="validate" />
              <label htmlFor="simCount">Simulation Count</label>
            </div>
            <br />
            <button className="btn btn-large" onClick={() => {this.simulate();}}>
              Battle
            </button>
            <button className="btn btn-large" onClick={() => {this.resetResults();}}>
              Reset
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s12 center">
            <h4 className="grey-text text-lighten-2">Results</h4>
            <h4 className="grey-text text-lighten-2">Battles Fought: {this.state.battleCount}</h4>
          </div>
        </div>
        <div className="row">
          <Results results={this.state.results.actor_1} actor={this.state.actor_1} battleCount={this.state.battleCount} />
          <Results results={this.state.results.actor_2} actor={this.state.actor_2} battleCount={this.state.battleCount} />
        </div>

        <Link className="btn btn-menu" to="/game">Back To Game</Link>

      </div>
    );
  }
}

export default BattleSim;
