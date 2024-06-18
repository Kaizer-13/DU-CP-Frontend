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
import Profile from './Pages/Profile'
import EditRole from './Pages/EditRoles';
import EditProfile from './Pages/EditProfile';
import Practice from './Pages/Practice';
import PostPage from './Pages/PostPage';
import ForgotPassword from './Pages/ForgotPassword';
import CheckContest from './Pages/CheckContest';
import CreatePost from './Pages/CreatePost';
import ProblemPage from './Pages/ProblemPage';
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

        <Route
            path="/createContests" 
            element={<CreateContests/>} 

        />

        <Route
            path="/profile" 
            element={<Profile/>} 

        />

        <Route
            path="/edit-profile" 
            element={<EditProfile/>} 

        />

        <Route
            path="/edit-role" 
            element={<EditRole/>} 

        />

        <Route
            path="/practice" 
            element={<Practice/>} 

        />
      <Route path="/contests/:contestId" element={<ContestPage/>}/>
      <Route path="/create-post" element={<CreatePost announcement={false}/>} />
      <Route path="/create-announcement" element={<CreatePost announcement={true}/>} />
      <Route path="/posts/:postId" element={<PostPage/>} />
      <Route path="/announcements/:postId" element={<PostPage/>} />
      <Route path="/posts/:id" element={<PostPage/>} />
      <Route path="/checkContest" element={<CheckContest/>}/>
      <Route path = '/forgot-password' element ={<ForgotPassword/>}/>
      <Route path="/problem/:problemId" element={<ProblemPage/>} />
      <Route path="/contests/:contestId/problem/:problemId" element={<ContestPage/>} />

      </Routes>
    </Router>
  </>
  );
}

export default App;
