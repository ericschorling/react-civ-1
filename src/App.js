
import './App.css';
import GameBoard from './components/GameBoard';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Home } from './components/Home';
import { useSelector } from 'react-redux';

function App() {
  const turn = useSelector((state)=> state.gameBoard.turn)
  return (
    <div className="App">
      <header>
        <h1> Foundation the Game!!!</h1>
        
      </header>
      
      <div className="turn-counter">
        <div className="game-info">
          <h3>Game Info</h3>
          <p>Turn {turn}</p> 
        </div>
      </div>
      <main>
        <Router>
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/Foundation'>Game</Link>
          </nav>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/Foundation'>
            <div>
              <GameBoard/>
            </div>
            </Route>
          </Switch>
          </div>
        </Router>
        
      </main>
      <footer className="footer-bar">
        Made by Eric @ <a href="httpss://ericschorling.dev" 
       >Here</a>
      </footer>
    </div>
  );
}

export default App;
