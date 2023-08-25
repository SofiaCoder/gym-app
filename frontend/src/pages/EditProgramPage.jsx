import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patchProgram from '../components/programs/functions/patchProgram';
import { cap } from '../globalFunctions/uppercaseCaps';

const EditableProgram = () => {
  const [programName, setProgramName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [response, setResponse] = useState('');
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getEditablePrograms = async () => {
      const res = await fetch('http://localhost:8080/programs', {
        credentials: 'include',
      });

      if (res.status === 401){
        setResponse('You are logged out, redirecting you to login-page');
        setTimeout(() => {
          navigate('/');
        }, 4000);
        return;
      }
      const data = await res.json();
      const programIndex = await data.findIndex(
        (program) => program._id === id
      );
      setProgramName(data[programIndex].programName);
      setExercises(data[programIndex].exercises);

      if (location.state) {
        setExercises(location.state[programIndex]);
        return;
      }
    };
    getEditablePrograms();
  }, [id, navigate, location.state]);

  const onChangeHandler = (e, index) => {
    e.preventDefault();
    const exerciseCopy = [...exercises]
    exerciseCopy[index][e.target.name] = parseInt(e.target.value)
    setExercises(exerciseCopy)
  };
  
  const patchHandler = (e) => {
    e.preventDefault();
    patchProgram(programName, id, exercises);
    timeOutFunction();
  };

  const timeOutFunction = () => {
    setTimeout(() => {
      navigate('/ProgramsPage');
    }, 3000);
  };

  return (
    <div className='exerciseForm'>
      {response && 
        <h2>{response}</h2>}
      <form onSubmit={patchHandler}>
        <label htmlFor='task'>Program: </label>
        <input
          type='text'
          value={programName}
          id='task'
          onChange={(e) => setProgramName(e.target.value)}
        />
      {exercises?.map((exercise, index) => {
        return (
          <div key={index}>
            <h3>{cap(exercise.exerciseName)}</h3>
            <label htmlFor='todoText'>Reps: </label>
            <input
              type='number'
              value={exercise.reps}
              name='reps'
              id='todoText'
              onChange={(e) => onChangeHandler(e, index)}
            />
            <br></br>
            <label htmlFor='task'>Sets: </label>
            <input
              type='number'
              value={exercise.sets}
              name='sets'
              id='task'
              onChange={(e) => onChangeHandler(e, index)}
            />
            <br></br>
            <label htmlFor='task'>Weight: </label>
            <input
              type='number'
              value={exercise.weight}
              name='weight'
              id='task'
              onChange={(e) => onChangeHandler(e, index)}
            />
              <br></br>
            <label htmlFor='task'>RPE: </label>
            <input
              type='number'
              value={exercise.RPE}
              name='RPE'
              id='task'
              onChange={(e) => onChangeHandler(e, index)}
            />
          </div>
          )
      })}
        <input type='submit' id='todoBtn' value='Save' /> 
      </form>
    </div>
  );
};

export { EditableProgram };
