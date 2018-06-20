import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AnimatedSwitch } from 'react-router-transition';
import Game from './Game';
import TitleScreen from './TitleScreen';
import BattleSim from './BattleSim';

const App = () => (
  <Router>
  <div>
    <main>
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="fade"
    >
      <Route exact path="/" component={TitleScreen} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/battlesim" component={BattleSim} />
    </AnimatedSwitch>
    </main>
  </div>
  </Router>
)

export default App;
