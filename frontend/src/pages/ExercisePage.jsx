import Exercises from '../components/exercises/Exercises';
import { ExerciseForm } from '../components/Form/ExerciseForm';
import './scss/ExercisePage.scss';
import { postExercise } from '../components/exercises/functions/postExercise.js';
import { FriendPage } from './FriendPage';
import { ProgramForm } from '../components/Form/ProgramForm';
import { postProgram } from '../components/programs/functions/postProgram';

const ExercisePage = () => {
  const user = localStorage.getItem('username');
  return (
    <div className='ExercisePage'>
      <h1>{user}'s training</h1>
      <ProgramForm 
        className='exerciseForm'
        submitFunction={postProgram}
        btnText='Add' />
      {/* <ExerciseForm
        className='exerciseForm'
        submitFunction={postExercise}
        btnText='Add'
      /> */}
      <Exercises className='Exercises' />
      <FriendPage className='friendPage' />
    </div>
  );
};

export default ExercisePage;
