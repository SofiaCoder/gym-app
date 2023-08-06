import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Exercises.scss';
import deleteExercise from './functions/deleteExercise';
import { getPrograms } from '../programs/functions/getPrograms';
import { getDetailedPrograms } from '../programs/functions/getDetailedPrograms';
import { cap } from '../../global functions/uppercaseCaps';

const HandlingExercises = () => {
  const [programs, setPrograms] = useState([]);
  const [detailedPrograms, setDetailedPrograms] = useState(null);
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  //Fetch all the users training programs and store it in programs
  const fetchPrograms = useCallback(async () => {
    const usersPrograms = await getPrograms();

    if (usersPrograms === 401) {
      setResponse('You are logged out, redirecting you to login-page');
      setTimeout(() => {
        navigate('/');
      }, 4000);
      return;
    }

    // let fetchDetailedPrograms = [];
    // for (const program of usersPrograms) {
    //   const fetchedProgram = await getDetailedPrograms(program._id);
    //   if (fetchedProgram) {
    //     fetchDetailedPrograms.push(fetchedProgram);
    //   }
    // }


    const temp = await Promise.all(usersPrograms.flatMap(p => getDetailedPrograms(p._id)))
    const detailedPrograms = temp.filter(x => !!x) // (x => x != null)

    setPrograms(usersPrograms)
    setDetailedPrograms(detailedPrograms)

    }, [navigate]);



  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);


  const deleteHandler = async (exerciseID) => {
    const id = exerciseID;
    const response = await deleteExercise(id);
    setResponse(response);
    scrollTop();
    setTimeout(() => {
      fetchPrograms();
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
        {programs?.map((program, index) => {
          return (
            <div className='todoBox' key={program._id}>
              <h3>{cap(program.programName)}</h3>
              {detailedPrograms == null ? (
                <p>Loading...</p>
              ) : detailedPrograms[index].length === 0 ?  (
                <p>No exercises added in this program</p>
              ) : (
                detailedPrograms[index]?.map((exercise, index) => {
                  return (
                    <div key={index}>
                      <h4>{cap(exercise.exerciseName)}</h4>
                      <p>Sets: {exercise.sets}</p>
                      <p>Reps: {exercise.reps}</p>
                    </div>
                  )
                }))}
              <Link
                className='editLink'
                to={`/Exercises/${program._id}`}
                state={program}
              >
                Edit
              </Link>
              <button
                className='deleteBtn'
                onClick={() => {
                  deleteHandler(program._id);
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
