import { Routes, Route } from 'react-router-dom';
import './App.scss';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ExercisePage from './pages/ExercisePage';
import { EditableExercise } from './pages/EditableExercise';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/RegisterPage' element={<RegisterPage />} />
        <Route path='/ExercisePage' element={<ExercisePage />} />
        <Route path='/Exercises/:id' element={<EditableExercise />} />
      </Routes>
    </div>
  );
}

export default App;
