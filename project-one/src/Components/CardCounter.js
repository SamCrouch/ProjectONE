import {useState, useContext} from 'react'
import DeckContext from '../deckContext'

function CardCounter(props) {
  const {cardValues} = useContext(DeckContext)
  
    const count = props.hand.map((card) => cardValues[card[0]])
    // does not work with chained reducer
    function reduce(arr=[1, 1]) {
      let result = 0
  
      for (let i = 0; i < arr.length; i++) {
        result += arr[i]
      }
  
      return result
    }
    
    const output = reduce(count);

  return(
    <div>{output < 22 ? output : `you lose`}</div>
  )

}

export default CardCounter;