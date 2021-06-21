import './App.css';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Blackjack from './Components/Blackjack'
import Nav from './Components/Nav';
import DeckContext from './deckContext'




function App() {

  const [deckId, setDeckId] = useState('')

  const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "0": 10,
    A: 11,
    K: 10,
    Q: 10,
    J: 10,
  }

  useEffect(() => {
    async function getDeck() {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      const json = await response.json()
      await setDeckId(json.deck_id)
    }
    getDeck();
  }, [])


  return (
    <DeckContext.Provider value={{
      deckId,
      cardValues
    }}>
      <div>
        <Router>
          <Nav />
          <Switch>
            <Route path="/blackjack" component={Blackjack} />
          </Switch>
        </Router>
      </div>
    </DeckContext.Provider>
  );
}

export default App;