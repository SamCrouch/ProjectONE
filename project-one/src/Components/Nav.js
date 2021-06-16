import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Nav() {

  

  return(
      <nav className="nav">
        <a>
        <Link className="link" to="/blackjack">Blackjack</Link>
        </a>
      </nav>

  )
}

export default Nav;