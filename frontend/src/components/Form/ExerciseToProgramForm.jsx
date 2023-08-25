import { useState, useEffect } from 'react';
import { getAllExercises } from '../exercises/functions/getAllExercises';
import './scss/exerciseForm.scss';

const ExerciseToProgramForm = ({ programId, submitFunction, btnText }) => {
  const [exercisesToChoose, setExercisesToChoose] = useState([])
  const [exerciseId, setExerciseId] = useState('');
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rpe, setRpe] = useState(0);
  const [response, setResponse] = useState('');
  const [toggle, setToggle] = useState(true);
  const [buttonText, setButtonText] = useState('Add exercise');

  useEffect(() => {
    const getExercisesFromDatabase = async () => {
      const exercises = await getAllExercises()
      setExercisesToChoose(exercises)
      }
    getExercisesFromDatabase()
  }, [])
  console.log()

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const response = await submitFunction(programId, exerciseId, reps, sets, weight, rpe);
    setResponse(response);
    setTimeout(() => {
      setResponse('');
      setExerciseId('');
      setReps(0);
      setSets(0);
      setWeight(0);
      setRpe();
      window.location.reload();
    }, 2000);
  };

  const toggleHandler = () => {
    if (toggle === true){
      setToggle(false)
      setButtonText('Hide')
      return;
    }
    setToggle(true)
    setButtonText('Add exercise')
  }

  return (
    <>
      <button onClick={toggleHandler}>{buttonText}</button>
      <div className='exerciseForm' id={toggle ? 'hide' : 'show'}>
        <form onSubmit={submitHandler}>
          <label htmlFor='task'>Exercise: </label>
          <select
            value={exerciseId}
            id='task'
            onChange={(e) => setExerciseId(e.target.value)}
          >
            <option value=''>Select exercise</option>
            {exercisesToChoose && exercisesToChoose.map(exercise => {
              return(
                <option key={exercise._id} value={exercise._id}>{exercise.exerciseName}</option>
              )
            })}
          </select>
          <label htmlFor='task'>Reps: </label>
          <input
            type='number'
            value={reps}
            id='task'
            onChange={(e) => setReps(e.target.value)}
          />
          <label htmlFor='todoText'>Sets: </label>
          <input
            type='number'
            value={sets}
            id='task'
            onChange={(e) => setSets(e.target.value)}
          />
          <label htmlFor='todoText'>Weight: </label>
          <input
            type='number'
            value={weight}
            id='task'
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor='todoText'>RPE: </label>
          <input
            type='number'
            value={rpe}
            id='task'
            onChange={(e) => setRpe(e.target.value)}
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

export { ExerciseToProgramForm };
