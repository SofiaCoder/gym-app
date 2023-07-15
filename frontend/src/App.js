import { Routes, Route } from 'react-router-dom';
import './App.scss';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import ExercisePage from './pages/ExercisePage';
import { SingleExercise } from './pages/SingleExercise';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/RegisterPage' element={<RegisterPage />} />
        <Route path='/ExercisePage' element={<ExercisePage />} />
        <Route path='/Exercises/:id' element={<SingleExercise />} />
      </Routes>
    </div>
  );
}

export default App;
