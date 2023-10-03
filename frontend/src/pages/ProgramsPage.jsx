import { ExerciseForm } from '../components/Form/ExerciseForm';
import './scss/ExercisePage.scss';
import { postNewExercise } from '../components/exercises/functions/postNewExercise.js';
import { FriendPage } from './FriendPage';
import { ProgramForm } from '../components/Form/ProgramForm';
import { postProgram } from '../components/programs/functions/postProgram';
import ProgramBox from '../components/programs/ProgramBox';

const ProgramsPage = () => {
  const user = localStorage.getItem('username');
  return (
    <div className='ExercisePage'>
      <h1>{user}'s training</h1>
      <ProgramForm 
        className='programForm'
        submitFunction={postProgram}
        btnText='Add' />
      <ExerciseForm
        className='exerciseForm'
        submitFunction={postNewExercise}
        btnText='Add'
      />
      <ProgramBox className='Exercises' />
      <FriendPage className='friendPage' />
    </div>
  );
};

export default ProgramsPage;
