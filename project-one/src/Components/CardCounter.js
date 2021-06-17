import {useState, useContext} from 'react'
import DeckContext from '../deckContext'

function CardCounter(props) {
  const {cardValues} = useContext(DeckContext)
  const count = props.hand.map((card) => cardValues[card[0]])

  return(
    // <div>{output < 22 ? output : `you lose`}</div>
    <div className="hand">
     {props.isDealer && props.isStarted ? 
     <div className="hand">
     <img src={`https://deckofcardsapi.com/static/img/${props.hand[0]}.png` } />
      <img src={`https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png`} />
      </div>
       :
    <div className="hand">
      {props.hand.map(card => <img src={`https://deckofcardsapi.com/static/img/${card}.png`} />)}
    </div>}
  </div>
  )
}

export default CardCounter;