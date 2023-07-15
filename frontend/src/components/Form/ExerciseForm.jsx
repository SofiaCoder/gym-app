import { useState, useEffect } from 'react';
import './scss/exerciseForm.scss';

const ExerciseForm = ({ title, group, submitFunction, btnText }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState();

  useEffect(() => {
    const startSetHandler = () => {
      if (title && group) {
        setExerciseName(title);
        setMuscleGroup(group);
      }
    };
    startSetHandler();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await submitFunction(exerciseName, muscleGroup);
    setResponse(response);
    setTimeout(() => {
      setResponse('');
      setExerciseName('');
      setMuscleGroup('');
      setDescription('');
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <div className='exerciseForm'>
        <form onSubmit={submitHandler}>
          <label htmlFor='task'>Exercise: </label>
          <input
            type='text'
            value={exerciseName}
            id='task'
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <label htmlFor='task'>Muscle-group: </label>
          <select
            value={muscleGroup}
            id='task'
            onChange={(e) => setMuscleGroup(e.target.value)}
          >
            <option value='shoulders'>Shoulders</option>
            <option value='chest'>Chest</option>
            <option value='arms'>Arms</option>
            <option value='abs'>Abs</option>
            <option value='back'>Back</option>
            <option value='legs'>Legs</option>
            <option value='cardio'>Cardio</option>
            <option selected value=''></option>
          </select>
          <label htmlFor='todoText'>Description: </label>
          <textarea
            value={description}
            id='todoText'
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type='submit' id='todoBtn'>
            {btnText}
          </button>
        </form>
      </div>
      <h3>{response}</h3>
    </>
  );
};

export { ExerciseForm };
