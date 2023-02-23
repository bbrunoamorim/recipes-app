import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import loginImage from '../images/loginImage.jpg';

export default function Login() {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    handleSubmit,
  } = useContext(MyContext);

  return (
    <div>
      <h1
        className="text-center my-5 text-violet-700 font-dancing text-5xl"
      >
        Do It Yourself
      </h1>
      <img
        src={ loginImage }
        alt="meal-logo"
        width="200px"
        className="mx-auto rounded-full w-72 h-72 p-2 my-2"
      />
      <form className="text-center p-4 w-3/4 mx-auto">
        <h1 className="mb-4 text-violet-700 text-4xl">Login</h1>
        <fieldset className="mb-1">
          <label htmlFor="Email" className="mb-2 w-full">
            <input
              name="Email"
              value={ email }
              type="text"
              placeholder="E-mail"
              onChange={ handleChangeEmail }
              className="p-2 rounded-lg border-2 border-purple-600 shadow w-3/4"
            />
          </label>
        </fieldset>
        <label htmlFor="Password" className="mb-2 w-full">
          <input
            data-testid="password-input"
            name="Password"
            value={ password }
            type="Password"
            placeholder="Password"
            onChange={ handleChangePassword }
            className="p-2 rounded-lg border-2 border-purple-600 shadow w-3/4"
          />
        </label>
        <fieldset className="flex justify-around items-center my-3">
          <label htmlFor="remember" className="text-xs">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="mr-1 accent-violet-700"
            />
            Remember me
          </label>
          <small
            className="text-right text-violet-600 cursor-pointer
            text-xs hover:font-semibold hover:text-yellow-400"
          >
            Forgot your password?
          </small>
        </fieldset>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ submitDisable }
          onClick={ handleSubmit }
          className="bg-violet-700 text-white p-2 rounded-lg w-3/4 cursor-pointer
          transition-all duration-200 hover:bg-violet-500 shadow"
        >
          Login
        </button>
        <button
          type="button"
          className="bg-yellow-200 rounded-lg w-3/4 mt-2 p-1 shadow
          transition-all duration-200 hover:bg-yellow-300"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
