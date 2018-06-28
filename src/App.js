import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Game from './Game';
import TitleScreen from './TitleScreen';
import BattleSim from './BattleSim';
import { publicUrl } from './Helper';

console.log(process.env)

const App = () => (
  <Router>
  <div>
    <main>
      <Route exact path={publicUrl() + '/'} component={TitleScreen} />
      <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="fade"
      >
      <Route exact path={publicUrl() + '/game'} component={Game} />
      <Route exact path={publicUrl() + '/battlesim'} component={BattleSim} />
    </AnimatedSwitch>
    </main>
  </div>
  </Router>
)

export default App;
