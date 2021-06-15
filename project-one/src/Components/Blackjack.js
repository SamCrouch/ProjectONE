import {useContext, useState} from 'react'
import DeckContext from '../deckContext'
import CardCounter from './CardCounter'



function Blackjack() {
const {deckId, cardValues} = useContext(DeckContext)
const [playerHand, setPlayerHand] = useState([])
const [dealerHand, setDealerHand] = useState([])
const [gameStarted, setGameStarted] = useState(false)
// const [dealerTurn, setDealerTurn] = useState(false)

async function getHand() {
  setGameStarted(true)
  await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
  const json = await response.json()
  await setPlayerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 1))
  await setDealerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 0))
}

async function getHit() {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  const json = await response.json()
  await setPlayerHand([...playerHand, json.cards[0].code])
}

async function getDealerHit() {
  // console.log(document.querySelector(`.dealer-score`).value)
//   if(document.querySelector(`.dealer-score`).innerText < 17) {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  const json = await response.json()
  await setDealerHand([...dealerHand, json.cards[0].code])
//   }
}

function reduce(arr=[1, 1]) {
      let result = 0
  
      for (let i = 0; i < arr.length; i++) {
        result += arr[i]
      }
  
      return result
    }

    const count = dealerHand.map((card) => cardValues[card[0]])
    // does not work with chained reducer  
    const dealerValue = reduce(count);

    if (dealerValue < 17) {
      
    } 


function startDealer() {
    if (dealerValue < 17) {
        getDealerHit()
        reduce(dealerHand)
    }
    if (dealerValue < 17) {
        getDealerHit()
        reduce(dealerHand)
    }
    if (dealerValue < 17) {
      getDealerHit()
      reduce(dealerHand)
  }
  if (dealerValue < 17) {
    getDealerHit()
    reduce(dealerHand)
  }
  if (dealerValue < 17) {
  getDealerHit()
  reduce(dealerHand)
  }
  if (dealerValue < 17) {
  getDealerHit()
  reduce(dealerHand)
  }
    return(
    <div>{dealerValue < 22 ? dealerValue : `dealer loses`}</div>
  )

}

  return (
      <div> 
          <button className='' onClick={() => getHand()} >Start Game</button>
          {gameStarted ? 
          <div>
          <div className="player-hand">
            <CardCounter hand={playerHand} /> 
            <button onClick = {() => getHit() } >Hit</button>
            <button onClick = {() => startDealer()} >Stay</button>
          </div>
          <div className="dealer-hand">

          <>{dealerValue}</>

            {/* <CardCounter className="dealer-score" hand={dealerHand} /> */}
          </div> 
          </div>
          : <></>}       
    </div>
  )
}

export default Blackjack