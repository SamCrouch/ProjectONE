import {useState, useEffect, useReducer} from 'react'
function ChipCounter(props) {
  const [chips, setChips] = useState(1000);
  const initialWinner = {winner: `nobody`}
  const [winner, dispatch] = useReducer(winnerReducer, initialWinner);


  function winnerReducer(state, action) {
    switch (action.type) {
      case 'player':
        return {winner: 'player'};
      case 'dealer':
        return {winner: 'dealer'};
      case 'tie':
        return {winner: `tie`};
      default:
        throw new Error();
      }
    }

    useEffect(() => {
      victoryCheck()
    }, [props.player, props.dealer])

    function victoryCheck() {

      if(props.player > 21) {
        dispatch({type: 'dealer'})
      } else if ( (props.player > props.dealer && props.player <= 21) || props.dealer > 21) {
        console.log(props.dealer)
        dispatch({type: 'player'})
        } else if ((props.dealer > props.player && props.dealer <= 21)) {
          dispatch({type: 'dealer'})
        } else if ( props.dealer === props.player && props.player <= 21 && props.player !== 0) {
          dispatch({type: 'tie'})
        }
    }

  function placeBet(bet) {
    console.log(`you bet ${bet} chips`)
  }

  return (
    // <div>
    //   <button onClick={() => (placeBet(5))}>5</button>
    //   <button onClick={() => (placeBet(25))}>25</button>
    //   <button onClick={() => (placeBet(50))}>50</button>
    <div>
    {!props.started ? 
      <div>
      <div onClick={() => {placeBet(5)}} className="pokerchip white"></div>
      <div onClick={() => {placeBet(25)}} className="pokerchip green"></div>
      <div onClick={() => {placeBet(50)}} className="pokerchip red"></div>
      
      <div className="chips">Chip Total: {chips}</div>
      
    </div> : <></>
    }
    </div>
  )
}

export default ChipCounter;