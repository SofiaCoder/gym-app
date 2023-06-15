import './App.css';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <AuthPage/> } />
        <Route path='/LandingPage' element={ <LandingPage/> } />
      </Routes>
    </div>
  );
}

export default App;
