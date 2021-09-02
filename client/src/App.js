
import './App.css';
import GameBoard from './components/GameBoard';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Home } from './components/Home';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      
      <Router>
        <header>
          <h1> Foundation the Game!!!</h1>
        </header>
        <main>
          <div>
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route path='/Foundation'>
                <GameBoard/>
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
        
      
      <footer className="footer-bar">
        Made by Eric @ <a href="httpss://ericschorling.dev" 
       >Here</a>
      </footer>
    </div>
  );
}

export default App;
