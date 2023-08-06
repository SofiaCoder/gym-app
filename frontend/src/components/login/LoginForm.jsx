import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from '../Form/AuthForm';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const Login = async () => {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, password }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await res.text();
    setResponse(data);
    if (res.status === 200) {
      localStorage.setItem('username', username);
      window.location.href = '/ProgramsPage';
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    Login();
  };

  const usernameSetter = (e) => setUsername(e.target.value);
  const passwordSetter = (e) => setPassword(e.target.value);

  return (
    <>
      <h1>Login</h1>
      <AuthForm
        username={username}
        usernameSet={usernameSetter}
        password={password}
        passwordSet={passwordSetter}
        submitFunction={Submit}
        btnText='Log in'
      />
      <Link to='/RegisterPage'>Register</Link>
      <h2>{response}</h2>
    </>
  );
};
export default LoginForm;
