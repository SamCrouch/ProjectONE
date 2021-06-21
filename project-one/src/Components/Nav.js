import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Nav() {

  

  return(
      <nav className="nav">
        <a><Link className="link" to="/blackjack">Blackjack</Link></a>
        <a><Link className="link" to="/blackjack">Sabacc</Link></a>
        <a><Link className="link" to="/blackjack">Go Fish</Link></a>
        <a><Link className="link" to="/blackjack">3D Chess</Link></a>
        <a><Link className="link" to="/blackjack">Old Maid</Link></a>
      </nav>

  )
}

export default Nav;