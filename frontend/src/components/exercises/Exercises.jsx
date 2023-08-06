import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Exercises.scss';
import deleteExercise from './functions/deleteExercise';
import { getPrograms } from '../programs/functions/getPrograms';
import { getDetailedPrograms } from '../programs/functions/getDetailedPrograms';

const HandlingExercises = () => {
  const [programs, setPrograms] = useState([]);
  //const [exercises, setExercises] = useState();
  const [detailedPrograms, setDetailedPrograms] = useState(null);
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  //Fetch all the users training programs and store it in programs
  const fetchPrograms = async () => {
    const usersPrograms = await getPrograms();

    if (usersPrograms === 401) {
      setResponse('You are logged out, redirecting you to login-page');
      setTimeout(() => {
        navigate('/');
      }, 4000);
      return;
    }

    setPrograms(usersPrograms)

    let fetchDetailedPrograms = [];
    for (const program of usersPrograms){
      const fetchedProgram = await getDetailedPrograms(program._id);
      if (fetchedProgram.length > 0) {
        debugger
       fetchDetailedPrograms.push(fetchedProgram);
      } 
     }

     console.log(fetchDetailedPrograms)
    setDetailedPrograms(fetchDetailedPrograms)
    
    
    
    // let exerciseInfo = [];
    // const exercisesInProgram = usersPrograms.map((program) => program.exercises)
    // const exerciseIds = exercisesInProgram.flat().map((exercises) => exercises.exercise_id);
    // for (const exercise of exerciseIds){
    //   const fetchedExercise = await getExerciseById(exercise)
    //   exerciseInfo.push(fetchedExercise)
    // }
    // exerciseInfo = exerciseInfo.flat()
    // const flattenedExerciseInProgram = exercisesInProgram.flat()
  
    // const detailedPrograms = flattenedExerciseInProgram.map((exercise1) => {
    //   const matchingExercises = exerciseInfo.find((exercise2) => exercise1.exercise_id === exercise2._id) 
    //     if (matchingExercises){
    //       return{ ...exercise1, ...matchingExercises}
    //     }
    //     return exercise1
    // });

    // setDetailedPrograms(detailedPrograms);
  };

 

  useEffect(() => {
    async function loadPage() {
    await fetchPrograms();
    }
    loadPage()
    // eslint-disable-next-line
  }, []);


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
              <h3>{program.programName}</h3>
              {detailedPrograms === null ? (
                <p>Loading...</p>
              ) : detailedPrograms.length === 0 ? (
                <p>No exercises added in this program</p>
              ) : (
              detailedPrograms[index]?.map((exercise, index) => {
                  return (
                    <div key={index}>
                      <p>{exercise.exerciseName}</p>
                      <p>Sets: {exercise.sets}</p>
                      <p>Reps: {exercise.reps}</p>
                    </div>
                )}))}
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
