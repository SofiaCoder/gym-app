import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/ProgramBox.scss';
import deleteExercise from '../exercises/functions/deleteExercise';
import { getPrograms } from './functions/getPrograms';
import { getDetailedPrograms } from './functions/getDetailedPrograms';
import { cap } from '../../globalFunctions/uppercaseCaps';
import deleteProgram from './functions/deleteProgram';
import { ExerciseToProgramForm } from '../Form/ExerciseToProgramForm';
import { postExerciseToProgram } from './functions/postExerciseToProgram';
import deleteExerciseFromProgram from './functions/deleteExerciseFromProgram';

const ProgramBox = () => {
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

  const deleteHandler = async (programId) => {
    const id = programId;
    const response = await deleteProgram(id);
    setResponse(response);
    scrollTop();
    setTimeout(() => {
      fetchPrograms();
      setResponse('');
    }, 2000);
  };

  const deleteExerciseHandler = async (programId, exerciseIndex) => {
    const response = await deleteExerciseFromProgram(programId, exerciseIndex);
    setResponse(response);
    setTimeout(() => {
      fetchPrograms();
      setResponse('');
    }, 2000);
  }

  const scrollTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <h3>{response}</h3>
      <div className='programBoxes'>
        {programs?.map((program, index) => {
          return (
            <div className='programBox' key={program._id}>
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
                      <p>Weight: {exercise.weight}</p>
                      <p>RPE: {exercise.RPE}</p>
                      <p>E1RM: {exercise.E1RM}</p>
                      <p>Total Weight: {exercise.totalWeight}</p>
                      <button onClick={() => {deleteExerciseHandler(program._id, index)}}>Delete exercise</button>
                    </div>
                  )
                }))}
              <ExerciseToProgramForm 
                programId ={program._id}
                submitFunction={postExerciseToProgram}
                btnText='Add'
              />
              <Link
                className='editLink'
                to={`/Programs/${program._id}`}
                state={detailedPrograms}
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

export default ProgramBox;
