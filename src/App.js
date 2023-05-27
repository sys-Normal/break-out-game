import React, {
  useState,
} from 'react';
import './App.css';

import Character from './Character';
import Canvas from './Canvas/Canvas';
import BallBounceGame from './ballGame/BallBounceGame';

function App() {
  return (
    <div className="App">
      {/* <Character /> */}
      <Canvas />
      {/* <BallBounceGame /> */}
    </div>

  );
}

export default App;
