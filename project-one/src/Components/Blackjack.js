import { useContext, useEffect, useState, useReducer } from 'react'
import DeckContext from '../deckContext'
import CardCounter from './CardCounter'
import ChipCounter from './ChipCounter'

function Blackjack() {
  const { deckId, cardValues } = useContext(DeckContext)
  const [playerHand, setPlayerHand] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerHand, setDealerHand] = useState([])
  const [dealerScore, setDealerScore] = useState(0)
  const [localDeck, setLocalDeck] = useState([])
  const [playerTurn, setPlayerTurn] = useState(false)
  const [stay, setStay] = useState(false)
  const [trueEnd, setTrueEnd] = useState(true)

  useEffect(() => {
    setDealerScore(addCards(dealerHand))
  }, [dealerHand])

  useEffect(() => {
    if (stay) {
      setTimeout(getDealerHit, 1000)
    }
  }, [dealerScore])

  useEffect(() => {
    setPlayerScore(addCards(playerHand))
  }, [playerHand])

  useEffect(() => {
    if (playerScore > 21) {
      setPlayerTurn(false)
      setTrueEnd(true)
    }
  }, [playerScore])

  async function getHand() {
    setPlayerTurn(true)
    setStay(false)
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
    const json = await response.json()
    setDealerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 0))
    setPlayerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 1))

    const deck = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=48`)
    const deckjson = await deck.json()
    setLocalDeck(deckjson.cards.map(card => card.code))
  }

  function getHit() {

    if (playerScore < 21 && !stay) {
      setPlayerHand([...playerHand, localDeck.shift()])
    }
  }

  function getDealerHit() {

    if (dealerScore < 17) {
      setDealerHand([...dealerHand, localDeck.shift()])

    } else {
      setTrueEnd(true)
    }
  }

  function reduce(arr = [1, 1]) {
    // workaround for .reduce not working properly with state change
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 11) {
        if ((result + arr[i]) > 21) {
          result += 1
        } else {
          result += arr[i]
        }
      } else {
        result += arr[i]
      }
    }
    return result
  }

  function addCards(hand) {
    const count = hand.map((card) => cardValues[card[0]])
    const sortedCount = count.sort((a, b) => a - b)
    // sorted to calculate aces
    const result = reduce(sortedCount)
    return result
  }

  function victoryBanner() {
    if (playerScore > 21) {

      return (
        <div>
          <p className="vic-message">BUST 🤮</p>
          <p className="bet-reminder">Place next bet!</p>
        </div>)
    } else if (trueEnd && (playerScore > dealerScore && playerScore <= 21) || dealerScore > 21) {
      return (
        <div>
          <p className="vic-message">WIN 🤑</p>
          <p className="bet-reminder">Place next bet!</p>
        </div>)
    } else if (trueEnd && (dealerScore > playerScore && dealerScore <= 21)) {
      return (
        <div>
          <p className="vic-message">LOSE 😥</p>
          <p className="bet-reminder">Place next bet!</p>
        </div>)
    } else if (trueEnd && dealerScore === playerScore && playerScore <= 21 && playerScore !== 0) {
      return (
        <div>
          <p className="vic-message">TIE 🤷‍♂️</p>
          <p className="bet-reminder">Place next bet!</p>
        </div>
      )
    } else if (trueEnd) {
      return (<p className='vic-message'>Place your bets!</p>)
    }
  }



  return (
    <div className="App">
      <div className="start-button">
        <button onClick={() => {
          getHand()
          setTrueEnd(false)
        }} >Start Game</button>
      </div>
      <div className="dealerhand">
        <CardCounter hand={dealerHand} stayCheck={stay} isStarted={playerTurn} isDealer={true} />
      </div>
      <div>
        {playerTurn ?
          <div className="buttons">
            <button onClick={() => { getHit() }}>Hit</button>
            <button onClick={() => {
              setStay(true)
              setPlayerTurn(false)
              getDealerHit()
            }}>Stand</button>
          </div>
          : <div className="victory-banner">
            {victoryBanner()}
          </div>}
      </div>
      <div className="playerhand">
        <CardCounter hand={playerHand} />
      </div>
      <div>
        <ChipCounter isStay={stay} started={playerTurn} player={playerScore} trueEnd={trueEnd} dealer={dealerScore} />
      </div>
    </div>

  )
}

export default Blackjack
