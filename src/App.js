import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import RequireAuth from './Pages/RequireAuth/RequireAuth';
import UpdateProfile from './Pages/UpdateProfile';

function App() {
  return (
    <div >
      
      <Routes>
        <Route path="/" element={<RequireAuth>
          <Home/>
        </RequireAuth>}></Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} /> 
        <Route path="/profile/update/:id" element={<UpdateProfile />} /> 
      </Routes>
      
    </div>
  );
}

export default App;
