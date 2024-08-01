import React from 'react';
import "./sass/app.scss";
import PokerGame from "./components/PokerGame";
import { PokerGameProvider } from "./contexts/PokerGameProvider";

function App() {
  return (
    <div className="App">
      <PokerGameProvider>
        <PokerGame></PokerGame>
      </PokerGameProvider>
    </div>
  );
}

export default App;
