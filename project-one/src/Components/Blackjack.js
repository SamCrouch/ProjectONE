import {useContext, useEffect, useState, useReducer} from 'react'
import DeckContext from '../deckContext'
import CardCounter from './CardCounter'
import ChipCounter from './ChipCounter'



function Blackjack() {
const {deckId, cardValues} = useContext(DeckContext)
const [playerHand, setPlayerHand] = useState([])
const [playerScore, setPlayerScore] = useState(0)
const [dealerHand, setDealerHand] = useState([])
const [dealerScore, setDealerScore] = useState(0)
const [localDeck, setLocalDeck] = useState([])
const [gameStarted, setGameStarted] = useState(false)
const [stay, setStay] = useState(false)






// const [dealerTurn, setDealerTurn] = useState(false)


// async function getHand() {
//   setGameStarted(true)
//   await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
//   const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
//   const json = await response.json()
//   setLocalDeck(json.cards.map(card => card.code))
// }

async function getHand()
{
  setGameStarted(true)
  setStay(false)
  await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
  const json = await response.json()
  setDealerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 0))
  setPlayerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 1))
  
  // addPlayerCards(playerHand)
  
  const deck = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=48`)
  const deckjson = await deck.json()
  setLocalDeck(deckjson.cards.map(card => card.code))
}
  




function getHit() {

  if (playerScore < 21 && !stay) {
    setPlayerHand([...playerHand, localDeck.shift()])
  }
}
useEffect(() => {
  addDealerCards(dealerHand)
}, [dealerHand])

useEffect(() => {
  if (stay && dealerScore < 17){
    setTimeout(getDealerHit, 1000)
  }
}, [dealerScore])

useEffect(() => {
  addPlayerCards(playerHand)
}, [playerHand])

useEffect(() => {

}, [stay])

useEffect(() => 
{
  if(playerScore > 21)
  {
    setGameStarted(false)
  }
}, [playerScore])


function getDealerHit() {
  
  let tempScore = dealerScore
  

  if (dealerScore < 17 && playerScore < 22) {
    setDealerHand([...dealerHand, localDeck.shift()])
    
  } 
}


function addPlayerCards(hand) {
  const count = hand.map((card) => cardValues[card[0]])
  const sortedCount = count.sort((a, b) => a-b)
  // reduce((accum, card) => accum + card)

  function reduce(arr=[1, 1]) {
    let result = 0
    
    for (let i = 0; i < arr.length; i++) {
    
        if(arr[i] === 11)
        {
            if((result + arr[i]) > 21)
            {
                result += 1
            }
            else
            {
                result += arr[i]
            }
        }
        else
        {
            result += arr[i]
        }
      }
      return result
}

  const result = reduce(sortedCount)
  setPlayerScore(result);
}

function addDealerCards(hand) {
  const count = hand.map((card) => cardValues[card[0]])
  // reduce((accum, card) => accum + card)

  function reduce(arr=[1, 1]) {
    let result = 0
    
    for (let i = 0; i < arr.length; i++) {
    
        if(arr[i] === 11)
        {
            if((result + arr[i]) > 21)
            {
                result += 1
            }
            else
            {
                result += arr[i]
            }
        }
        else
        {
            result += arr[i]
        }
      }
      return result
}

  const result = reduce(count)

  setDealerScore(result);
}

function victoryBanner() {
if(playerScore > 21){
  
  return (<p>BUST 🤮</p>)
}else if (stay && (playerScore > dealerScore && playerScore <= 21) || dealerScore > 21) {
    return( <p>WIN 🤑</p> )
    } else if (stay && (dealerScore > playerScore && dealerScore <= 21)) {
      return ( <p>LOSE 😥</p>)
    } else if ( stay && dealerScore === playerScore && playerScore <= 21 && playerScore !== 0) {
      return ( <p>TIE 🤷‍♂️</p>)
    } else {
      return (<></>)
    }
}




return (
  <div className="App"> 
    <div className="start-button">
      <button onClick={() => getHand()} >Start Game</button>
    </div>
          <div className="dealerhand">
            <CardCounter hand={dealerHand} stayCheck={stay} isStarted={gameStarted} isDealer={true} />
          </div> 
          <div>
            {gameStarted ? 
              <div className="buttons">
                <button onClick = {() => {getHit()}}>Hit</button>
                
                <button onClick = {() => {
                  setStay(true)
                  setGameStarted(false)
                  getDealerHit()}}>Stand</button>
              </div>
            : <div className="victory-banner">
            {victoryBanner()}
            </div>}
          </div>

          

      <div className="playerhand">
        <CardCounter hand={playerHand} />
        <ChipCounter isStay={stay} started={gameStarted} player={playerScore} dealer={dealerScore} />
      </div>
 
  </div>

  )
}

export default Blackjack
