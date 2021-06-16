import {useState, useContext} from 'react'
import DeckContext from '../deckContext'

function CardCounter(props) {
  const {cardValues} = useContext(DeckContext)
  const count = props.hand.map((card) => cardValues[card[0]])

  return(
    // <div>{output < 22 ? output : `you lose`}</div>
    <div>
      {props.hand.map(card => <img src={`https://deckofcardsapi.com/static/img/${card}.png`} />)}
    </div>
  )

}

export default CardCounter;