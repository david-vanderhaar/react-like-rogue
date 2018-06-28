import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Game from './Game';
import TitleScreen from './TitleScreen';
import BattleSim from './BattleSim';

console.log(process.env)
let BASE_URL = process.env.NODE_ENV === 'development' ? '' : '/react-like-rogue';

const App = () => (
  <Router>
  <div>
    <main>
      <Route exact path={BASE_URL + '/'} component={TitleScreen} />
      <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="fade"
      >
      <Route path='/game' component={Game} />
      <Route path='/battlesim' component={BattleSim} />
    </AnimatedSwitch>
    </main>
  </div>
  </Router>
)

export default App;
