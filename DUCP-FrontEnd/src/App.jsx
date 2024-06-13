
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
import ContestPage from './Pages/ContestPage';
import ProblemComponent from './Components/ProblemComponent';

function App() {
  const timestamps = [
    { time: '10:00 AM', status: 'check' },
    { time: '10:30 AM', status: 'close' },
    { time: '11:00 AM', status: 'minus' },
  ];
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


        <Route path="/pdf-viewer" element={<ProblemComponent pdfPath="/public/sample.pdf" timestamps={timestamps} />} />

        <Route path="/problem" element={<ContestPage/>}/>

      </Routes>
    </Router>
  </>
  );
}

export default App;
