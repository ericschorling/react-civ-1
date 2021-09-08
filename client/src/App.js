
import './App.css';
import React, {useState, useEffect} from 'react'
import GameBoard from './components/GameBoard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Home } from './components/Home';


function App() {
  const [data, setData] = useState(null)

  useEffect(()=>{
    fetch("/api")
    .then((res)=> res.json())
    .then((data)=> setData(data.message))
  }, [])

  
  return (
    <div className="App">
      
      <Router>
        <header>
          <h1> Foundation the Game!!!</h1>
          <p>{!data ? "Loading..." : data}</p>
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
        Made by Eric @ <a href="https://ericschorling.dev" 
       >Here</a>
      </footer>
    </div>
  );
}

export default App;
