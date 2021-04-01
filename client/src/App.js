import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
    <div className="AppContainer">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
