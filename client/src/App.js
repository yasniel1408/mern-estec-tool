import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Almacen from "./components/Almacen/Almacen";
import SideBar from "./components/SideBar/SideBar";
import './App.scss'

function App() {
  return (
    <Router>
      <div className="AppContainer">
        <Switch>
          <Route exact path="/" component={Login} />
          <Container />
        </Switch>
      </div>
    </Router>
  );
}

const Container = () => (
  <>
    <SideBar />
    <div className="contentWork">
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/almacen" component={Almacen} />
      </Switch>
    </div>
  </>
);

export default App;
