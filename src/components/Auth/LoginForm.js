import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import { loginUser, registerUser } from "../../firebase-api/firebase-api";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [loggingIn, setLogggingIn] = useState(true);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const userNameInputRef = useRef();

  const toggleForm = () => {
    setLogggingIn((prevState) => !prevState);
    setError(null);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = passwordConfirmInputRef.current.value;
    const enteredUserName = userNameInputRef.current.value;

    if (enteredUserName.length < 3) {
      authCtx.setLoading(false);
      return setError("Username must be at least 3 characters.");
    }

    if (enteredPassword !== enteredConfirmPassword) {
      setError("Passwords do not match!");
      authCtx.setLoading(false);
      passwordInputRef.current.value = "";
      passwordConfirmInputRef.current.value = "";
      return;
    }
    authCtx.setLoading(true);
    try {
      const { userId, token } = await registerUser(
        enteredEmail,
        enteredPassword,
        enteredUserName
      );
      authCtx.login(token, userId, enteredUserName);
      authCtx.setLoading(false);
    } catch (error) {
      authCtx.setLoading(false);

      setError(error.message);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    authCtx.setLoading(true);
    try {
      const { userId, token, userNameResult } = await loginUser(
        enteredEmail,
        enteredPassword
      );

      authCtx.login(token, userId, userNameResult);
      authCtx.setLoading(false);
    } catch (err) {
      setError(err.message);
      authCtx.setLoading(false);
    }
  };

  return (
    <section style={{ height: `100vw` }}>
      {!authCtx.isLoading && (
        <Card className={classes.loginForm}>
          {loggingIn && (
            <form className={classes.authForm} onSubmit={loginHandler}>
              <label htmlFor="email">Email:</label>
              <input id="email" type="text" ref={emailInputRef} required />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                ref={passwordInputRef}
                required
              />
              <button type="submit">Login</button>
            </form>
          )}
          {!loggingIn && (
            <form className={classes.authForm} onSubmit={registerHandler}>
              <label htmlFor="email">Email:</label>
              <input id="email" type="text" ref={emailInputRef} required />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                ref={passwordInputRef}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                id="confirmPassword"
                type="password"
                ref={passwordConfirmInputRef}
                required
              />
              <label htmlFor="userName">Username:</label>
              <input
                id="userName"
                type="text"
                ref={userNameInputRef}
                required
              />
              <button type="submit">Register</button>
            </form>
          )}
          {error && <div className={classes.error}>{error}</div>}
          <button className={classes.toggleForm} onClick={toggleForm}>
            {loggingIn
              ? "New User? Click to sign up"
              : "Already registered? Login"}
          </button>
        </Card>
      )}
      {authCtx.isLoading && <LoadingSpinner />}
    </section>
  );
};

export default LoginForm;
