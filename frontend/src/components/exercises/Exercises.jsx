import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Exercises.scss';
import deleteExercise from './functions/deleteExercise';
import { getExercises } from './functions/getExercises';

const HandlingExercises = () => {
  const [exercises, setExercises] = useState();
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  const fetchExercises = async () => {
    const data = await getExercises();

    if (data === 401) {
      setResponse('You are logged out, redirecting you to login-page');
      setTimeout(() => {
        navigate('/');
      }, 4000);
      return;
    }
    setExercises(data);
  };

  useEffect(() => {
    fetchExercises();
 // eslint-disable-next-line
  }, []);
 

  const deleteHandler = async (exerciseID) => {
    const id = exerciseID;
    const response = await deleteExercise(id);
    setResponse(response);
    scrollTop();
    setTimeout(() => {
      fetchExercises();
      setResponse('');
    }, 2000);
  };

  const scrollTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <h3>{response}</h3>
      <div className='todoBoxes'>
        {exercises?.map((exercise, index) => {
          return (
            <div className='todoBox' key={index}>
              <h3>{exercise.exerciseName}</h3>
              <h4>{exercise.muscleGroup}</h4>
              <p>{exercise.exerciseDescription}</p>
              <Link
                className='editLink'
                to={`/Exercises/${exercise._id}`}
                state={exercise}
              >
                Edit
              </Link>
              <button
                className='deleteBtn'
                onClick={() => {
                  deleteHandler(exercise._id);
                }}
              >
                ❌
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HandlingExercises;
