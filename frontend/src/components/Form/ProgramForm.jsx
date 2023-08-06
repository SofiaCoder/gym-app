import { useState, useEffect } from 'react';
import './scss/exerciseForm.scss';

const ProgramForm = ({ title, group, submitFunction, btnText }) => {
  const [programName, setProgramName] = useState('');
  const [response, setResponse] = useState();

  useEffect(() => {
    const startSetHandler = () => {
      if (title) {
        setProgramName(title);
      }
    };
    startSetHandler();
  }, [title]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await submitFunction(programName);
    setResponse(response);
    setTimeout(() => {
      setResponse('');
      setProgramName('');
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <div className='exerciseForm'>
        <form onSubmit={submitHandler}>
          <label htmlFor='task'>Program: </label>
          <input
            type='text'
            value={programName}
            id='task'
            onChange={(e) => setProgramName(e.target.value)}
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

export { ProgramForm };
