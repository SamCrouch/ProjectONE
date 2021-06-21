import { useState, useEffect, useReducer } from 'react'
function ChipCounter(props) {
  const [chips, setChips] = useState(1000);
  const [pot, setPot] = useState(0);
  const initialWinner = { winner: `nobody` }
  const [winner, dispatch] = useReducer(winnerReducer, initialWinner);


  function winnerReducer(state, action) {
    switch (action.type) {
      case 'player':
        return { winner: 'player' };
      case 'dealer':
        return { winner: 'dealer' };
      case 'tie':
        return { winner: `tie` };
      case 'nobody':
        return { winner: 'nobody' }
      default:
        throw new Error();
    }
  }

  useEffect(() => {
  // forces re-render when player/dealer scores change
  }, [props.player, props.dealer])

  useEffect(() => {
    victoryCheck()
  }, [props.trueEnd])

  useEffect(() => {
    payout()
  }, [winner])

  function victoryCheck() {

    if (props.player > 21) {
      dispatch({ type: 'dealer' })
    } else if ((props.player > props.dealer && props.player <= 21) || props.dealer > 21) {
      console.log(props.dealer)
      dispatch({ type: 'player' })
    } else if ((props.dealer > props.player && props.dealer <= 21)) {
      dispatch({ type: 'dealer' })
    } else if (props.dealer === props.player && props.player <= 21 && props.player !== 0) {
      dispatch({ type: 'tie' })
    }
  }

  function payout() {
    if (props.trueEnd) {
      if (winner.winner === `player`) {
        setChips(chips + (2 * pot))
        setPot(0)
      } else if (winner.winner === `dealer`) {
        setPot(0)
      } else if (winner.winner === `tie`) {
        setChips(chips + pot)
        setPot(0)
      }
    }
  }

  function placeBet(bet) {
    if (chips - bet >= 0 && props.trueEnd) {
      setChips(chips - bet);
      setPot(pot + bet);
    }
  }

  return (
    <div className="chips">
      <div onClick={() => { placeBet(5) }} className="holder h1">5</div>
      <div onClick={() => { placeBet(25) }} className="holder h2">25</div>
      <div onClick={() => { placeBet(50) }} className="holder h3">50</div>
      <div className="my-chip"></div>
      <div>Chip Total: {chips} Your Bet: {pot}</div>
    </div>
  )
}

export default ChipCounter;


// function payout() {
//   if (props.player > 21) {
//     setPot(0)
//   } else if ((props.player > props.dealer && props.player <= 21) || props.dealer > 21) {
//     if (props.trueEnd) {
//       setChips(chips + (2 * pot))
//       setPot(0)
//     }
//   } else if ((props.dealer > props.player && props.dealer <= 21)) {
//     if (props.trueEnd) {
//       setPot(0)
//     }
//   } else if (props.dealer === props.player && props.player <= 21 && props.player !== 0) {
//     if (props.trueEnd) {
//       setChips(chips + pot)
//       setPot(0)
//     }
//   }
// }