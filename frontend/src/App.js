//Router
import Home from './Pages/home/home'
import Listar from './Pages/listar/listar'
import Cargar from './Pages/cargar/cargar'

import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function App() {

  return (
    <div className="App App-header">
        <Router>
          <Switch>      
              <Route exact path='/' component={Home}/>
              <Route exact path='/listar' component={Listar}/>
              <Route exact path='/cargar' component={Cargar}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
