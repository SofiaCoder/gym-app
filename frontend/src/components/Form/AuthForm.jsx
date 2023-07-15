import './scss/authForm.scss'

const AuthForm = ({
    username,
    usernameSet,
    password,
    passwordSet,
    submitFunction,
    btnText}) => {


    return (
        <div className="authForm">
            <form>
                <label htmlFor="username">Username: </label>
                <input type="text" value={username} id="username" onChange={usernameSet} placeholder="Username"/>
                <label htmlFor="password">Password: </label>
                <input type="password" value={password} id="password" onChange={passwordSet} placeholder="Password"/>
                <button type="submit" id="loginRegisterBtn" onClick={submitFunction}>{btnText}</button>
            </form>
        </div>
    )
}

export { AuthForm }