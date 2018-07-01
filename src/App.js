import React from 'react';
import {BrowserRouter as Router, Route, HashRouter} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Game from './Game';
import TitleScreen from './TitleScreen';
import BattleSim from './BattleSim';

console.log(process.env)

const App = () => (
  <HashRouter>
  <div>
    <main>
      <Route exact path={process.env.PUBLIC_URL + '/'} component={TitleScreen} />
      <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="fade"
      >
      <Route exact path={process.env.PUBLIC_URL + '/game'} component={Game} />
      <Route exact path={process.env.PUBLIC_URL + '/battlesim'} component={BattleSim} />
    </AnimatedSwitch>
    </main>
  </div>
  </HashRouter>
)

export default App;
