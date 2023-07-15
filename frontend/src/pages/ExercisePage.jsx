import Exercises from '../components/exercises/Exercises';
import { ExerciseForm } from '../components/Form/ExerciseForm';
import './scss/ExercisePage.scss';
import { postExercise } from '../components/exercises/functions/postExercise.js';
import { FriendPage } from './FriendPage';

const ExercisePage = () => {
  const user = localStorage.getItem('username');
  return (
    <div className='ExercisePage'>
      <h1>{user}'s training</h1>
      <ExerciseForm
        className='exerciseForm'
        submitFunction={postExercise}
        btnText='Add'
      />
      <Exercises className='Exercises' />
      <FriendPage className='friendPage' />
    </div>
  );
};

export default ExercisePage;
