import patchExercise from '../components/exercises/functions/patchExercise';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditableExercise = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setExerciseName(location.state.exerciseName);
      setMuscleGroup(location.state.muscleGroup);
      setExerciseDescription(location.state.exerciseDescription);
      return;
    }

    const getEditableExercise = async () => {
      const res = await fetch('http://localhost:8080/exercises', {
        credentials: 'include',
      });
      const data = await res.json();

      const exerciseIndex = await data.findIndex(
        (exercise) => exercise.id === id
      );

      setExerciseName(data[exerciseIndex].exerciseName);
      setMuscleGroup(data[exerciseIndex].muscleGroup);
      setExerciseDescription(data[exerciseIndex].exerciseDescription);
    };
    getEditableExercise();
  }, [id, location.state]);

  const patchHandler = (e) => {
    e.preventDefault();
    patchExercise(exerciseName, muscleGroup, exerciseDescription, id);
    timeOutFunction();
  };

  const timeOutFunction = () => {
    setTimeout(() => {
      navigate('/ExercisePage');
    }, 3000);
  };

  return (
    <div className='exerciseForm'>
      <form onSubmit={patchHandler}>
        <label htmlFor='task'>Exercise: </label>
        <input
          type='text'
          value={exerciseName}
          id='task'
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <label htmlFor='todoText'>Description: </label>
        <textarea
          value={exerciseDescription}
          id='todoText'
          onChange={(e) => setExerciseDescription(e.target.value)}
        />
        <label htmlFor='task'>Muscle-group: </label>
        <input
          type='text'
          value={muscleGroup}
          id='task'
          onChange={(e) => setMuscleGroup(e.target.value)}
        />
        <input type='submit' id='todoBtn' value='Save' />
      </form>
    </div>
  );
};

export { EditableExercise };
