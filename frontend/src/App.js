import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from './pages/Display';
import EditUser from './pages/EditUser';
import { UserProvider } from './context/UserData';

function App() {
  return (
    <UserProvider>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Display/>}/>
    <Route path='/edit-user/:id' element={<EditUser/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
