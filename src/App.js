import React from 'react';
import {BrowserRouter as Router, Route, HashRouter} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Game from './Game';
import TitleScreen from './TitleScreen';
import BattleSim from './BattleSim';

const App = () => (
  <HashRouter>
  <div>
    <main>
      <Route exact path={'/'} component={TitleScreen} />
      <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="fade"
      >
      <Route path={'/game'} component={Game} />
      <Route path={'/battlesim'} component={BattleSim} />
    </AnimatedSwitch>
    </main>
  </div>
  </HashRouter>
)

export default App;
