
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import SignIn from './Pages/signin';
import Dashboard from './Pages/Dashboard';
import Leaderboard from './Pages/Leaderboard';

function App() {
  return (
    <>

    <Router>
      <Routes>

        <Route
          exact
          path="/"
          element={<SignIn/>}
        />

        <Route
            path="/dashboard" 
            element={<Dashboard/>} 

        />

        <Route
        path="/leaderboard"
        element={<Leaderboard/>}
        />

      
      </Routes>
    </Router>
  </>
  );
}

export default App;
