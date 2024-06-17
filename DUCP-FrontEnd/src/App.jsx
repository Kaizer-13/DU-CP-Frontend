import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import SignIn from './Pages/signin';
import Dashboard from './Pages/Dashboard';
import Leaderboard from './Pages/Leaderboard';
import Contests from './Pages/Contests';
import SignUp from './Pages/SignUp';
import ContestPage from './Pages/ContestPage';
import CreateContests from './Pages/CreateContests';

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
            path="/signup" 
            element={<SignUp/>} 

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
      <Route path="/contests/:contestId" element={<ContestPage/>}/>
      <Route path="/contests/:contestId/problem/:problemId" element={<ContestPage/>} />

      <Route path="/createContests" element={<CreateContests/>}/>

      </Routes>
    </Router>
  </>
  );
}

export default App;
