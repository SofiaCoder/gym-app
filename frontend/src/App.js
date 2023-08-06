import { Routes, Route } from 'react-router-dom';
import './App.scss';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { EditableExercise } from './pages/EditableExercise';
import ProgramsPage from './pages/ProgramsPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/RegisterPage' element={<RegisterPage />} />
        <Route path='/ProgramsPage' element={<ProgramsPage />} />
        <Route path='/Exercises/:id' element={<EditableExercise />} />
      </Routes>
    </div>
  );
}

export default App;
