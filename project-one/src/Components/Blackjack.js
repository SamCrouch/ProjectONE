import {useContext, useEffect, useState} from 'react'
import DeckContext from '../deckContext'
import CardCounter from './CardCounter'



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
  


// useEffect(() => {
  
//   setPlayerHand([localDeck[0], localDeck[2]])
//   // setPlayerHand(localDeck.slice(0, 1))
//   setDealerHand([localDeck[1], localDeck[3]])
//   // setPlayerHand([...playerHand, ...localDeck.slice(2, 3)])
//   // setDealerHand([...dealerHand, ...localDeck.slice(3, 4)])
  
// }, [localDeck])

// setPlayerHand(localDeck.shift())
//   setDealerHand(json.cards.map(card => card.code).filter((card, ind) => ind % 2 === 0))
//   console.log(playerHand)


function getHit() {
  // console.log(localDeck)
  // const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  // const json = await response.json()
  // await setPlayerHand([...playerHand, json.cards[0].code])
  if (playerScore < 21 && !stay) {
    setPlayerHand([...playerHand, localDeck.shift()])
  }
}
useEffect(() => {
  addDealerCards(dealerHand)
}, [dealerHand])

useEffect(() => {
  if (stay && dealerScore < 17){
    getDealerHit()
  }
}, [dealerScore])

useEffect(() => {
  addPlayerCards(playerHand)
}, [playerHand])


function getDealerHit() {
  // console.log(localDeck)
  // const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  // const json = await response.json()
  // await setPlayerHand([...playerHand, json.cards[0].code])
  
  let tempScore = dealerScore
  

  if (dealerScore < 17 && playerScore < 22) {
    setDealerHand([...dealerHand, localDeck.shift()])
    
  } 
}


function addPlayerCards(hand) {
  const count = hand.map((card) => cardValues[card[0]])
  const sortedCount = count.sort((a, b) => a-b)
  console.log(typeof sortedCount[0])
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
  console.log(result)
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
  // if (result < 17) {
  //   getDealerHit()
  // }

  setDealerScore(result);
}

function victoryBanner() {
if(playerScore > 21){
  return (<p>BUST</p>)
}else if (!gameStarted && (playerScore > dealerScore && playerScore <= 21) || dealerScore > 21) {
    return( <p>win</p> )
    } else if (!gameStarted && (dealerScore > playerScore && dealerScore <= 21)) {
      return ( <p>lose</p>)
    } else if ( !gameStarted && dealerScore === playerScore && playerScore <= 21 && playerScore !== 0) {
      return ( <p>tie</p>)
    } else {
      return (<></>)
    }
}


return (
  <div> 
    <div className="start-button">
      <button onClick={() => getHand()} >Start Game</button>
    </div>
 
          <div className="dealerhand">
            <CardCounter hand={dealerHand} isDealer={true} />
          </div> 
          <div>
            {gameStarted ? 
              <div className="buttons">
                <button onClick = {() => getHit() } >Hit</button>
                <button onClick = {() => {
                  setStay(true)
                  setGameStarted(false)
                  getDealerHit()}}>Stay</button>
              </div>
            : <></>}
          </div>

          <div className="victory-banner">
            {victoryBanner()}
          </div>

      <div className="playerhand">
        <CardCounter hand={playerHand} />
      </div>
 
  </div>

  )
}

export default Blackjack
// function reduce(arr=[1, 1]) {
  //       let result = 0
  
  //       for (let i = 0; i < arr.length; i++) {
    //         result += arr[i]
    //       }
    
    //       return result
    //     }
    
    //     const count = dealerHand.map((card) => cardValues[card[0]])
    //     // does not work with chained reducer  
    //     const dealerValue = reduce(count);
    
    //     if (dealerValue < 17) {
      
      //     } 
      // function startDealer() {
      //   if (dealerValue < 17) {
      //     getDealerHit()
      //     reduce(dealerHand)
      //   }
      //   if (dealerValue < 17) {
      //     getDealerHit()
      //     reduce(dealerHand)
      //   }
      //   if (dealerValue < 17) {
      //     getDealerHit()
      //     reduce(dealerHand)
      //   }
      //   if (dealerValue < 17) {
      //     getDealerHit()
      //     reduce(dealerHand)
      //   }
      //   if (dealerValue < 17) {
      //     getDealerHit()
      //     reduce(dealerHand)
      //   }
      //   if (dealerValue < 17) {
      //     getDealerHit()
      //     reduce(dealerHand)
      //   }
      //   return(
      //     <div>{dealerValue < 22 ? dealerValue : `dealer loses`}</div>
      //     )
          
      //   }