import './App.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App">
      {/* Router to handle navigation */}
      <Router>
        {/* Switch to choose the right page based on the URL */}
        <Switch>
          {/* Route for match details page */}
          <Route path="/teams/:teamName/matches/:year">
            <MatchPage />
          </Route>
          
          {/* Route for team details page */}
          <Route path="/teams/:teamName">
            <TeamPage />
          </Route>
          
          {/* Route for the home page */}
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
