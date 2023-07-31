import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Exercises.scss';
import deleteExercise from './functions/deleteExercise';
import { getExerciseById } from './functions/getExerciseById';
import { getPrograms } from './functions/getPrograms';
import { getAllExercises } from './functions/getAllExercises';

const HandlingExercises = () => {
  const [programs, setPrograms] = useState([]);
  //const [exercises, setExercises] = useState();
  //const [detailedPrograms, setDetailedPrograms] = useState();
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
    //setPrograms(usersPrograms);
    let exerciseInfo = [];
    const exercisesInProgram = usersPrograms.map((program) => program.exercises)
    const exerciseIds = exercisesInProgram.flat().map((exercises) => exercises.exercise_id);
    exerciseIds.forEach(async (exercise) => exerciseInfo.push(await getExerciseById(exercise)))

    //Fått ut alla matchande övingars info. Nu försöka få in detta in i programs genom att göra en ny array = detailedPrograms
    //const detailedPrograms = 
    console.log(exerciseInfo)

  };

  useEffect(() => {
    async function loadPage() {
    await fetchPrograms();
    //fetchExerciseDetails();
    }
    loadPage()
    // eslint-disable-next-line
  }, []);

//fetch exercise details from the exercise collection and store it in detailed programs state
  // const fetchExerciseDetails = async () => {

  //   const allExercises = await getAllExercises();

  //   if (allExercises === 401) {
  //     setResponse('You are logged out, redirecting you to login-page');
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 4000);
  //     return;
  //   }
  //   setExercises(allExercises);
    

  // //const exerciseIds = programs.map((program) => program.exercises.map(async (exercise) => {
  //   //const exerciseDetails = await getExerciseById(exercise.exercise_id)
    
  //   //  })
  //   //  )

  //   // setDetailedPrograms(exerciseIds)
  // };
  //console.log(detailedPrograms)

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
        {programs?.map((program) => {
          return (
            <div className='todoBox' key={program._id}>
              <h3>{program.programName}</h3>
              {program.exercises?.map((exercise, index) => {
                return (
                <p key={index}>{exercise.exercise_id}</p>)})}
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
