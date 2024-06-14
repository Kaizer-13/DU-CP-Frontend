
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
import Contests from './Pages/Contests';
import SignUp from './Pages/SignUp';
// import Profile from './Pages/Profile';

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

        <Route
            path="/contests" 
            element={<Contests/>} 

        />

        
        <Route 
        path="/signup"
         element={<SignUp />} 
         />

         {/* <Route
          path="/profile" 
          element={<Profile />} 
          /> */}

      
      </Routes>
    </Router>
  </>
  );
}

export default App;
