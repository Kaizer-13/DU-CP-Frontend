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
<<<<<<< HEAD
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile'

=======
import Practice from './Pages/Practice';
import ProblemPage from './Pages/ProblemPage';
import PostPage from './Pages/PostPage';
>>>>>>> 30409b3e2a6559acde00b9516f08d7f02d761f40

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
<<<<<<< HEAD
      <Route
            path="/profile" 
            element={<Profile/>} 

        />
         <Route path="/edit-profile" element={<EditProfile />} />
      
=======
      <Route path="/practice" element={<Practice/>}/>
      <Route path="/problem/:problemId" element={<ProblemPage/>} />
      <Route path="/posts/:id" element={<PostPage/>} />
>>>>>>> 30409b3e2a6559acde00b9516f08d7f02d761f40
      </Routes>
    </Router>
  </>
  );
}

export default App;
