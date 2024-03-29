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
        className="text-center my-5 text-orange-500 font-dancing text-5xl"
      >
        Do It Yourself
      </h1>
      <img
        src={ loginImage }
        alt="meal-logo"
        width="200px"
        className="mx-auto rounded-full w-72 h-72 p-2 my-2
        shadow-2xl shadow-emerald-100 object-cover"
      />
      <form className="text-center p-4 w-5/6 mx-auto">
        <h1 className="mb-4 text-orange-400 text-4xl font-outfit">Login</h1>
        <fieldset className="mb-1">
          <label htmlFor="Email" className="mb-2 w-full">
            <input
              name="Email"
              value={ email }
              type="text"
              placeholder="E-mail"
              onChange={ handleChangeEmail }
              className="p-2 rounded-lg border-2 border-orange-400
              max-w-md shadow w-5/6 font-outfit"
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
            className="p-2 rounded-lg border-2 border-orange-400 shadow
            w-5/6 font-outfit max-w-md"
          />
        </label>
        <fieldset
          className="flex justify-between items-center
          mx-auto my-3 w-5/6 max-w-md"
        >
          <label htmlFor="remember" className="text-xs font-outfit">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="mr-1 accent-emerald-300"
            />
            Remember me
          </label>
          <small
            className="text-right text-orange-500 cursor-pointer
            text-xs hover:font-semibold hover:text-emerald-300 font-outfit"
          >
            Forgot your password?
          </small>
        </fieldset>
        <fieldset className="flex-col">
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ submitDisable }
            onClick={ handleSubmit }
            className="bg-orange-500 text-white p-2 rounded-lg w-5/6 cursor-pointer
          transition-all duration-200 hover:bg-orange-300 hover:font-medium
          shadow font-outfit max-w-md block mx-auto"
          >
            Login
          </button>
          <button
            type="button"
            className="bg-emerald-200 rounded-lg w-5/6 mt-2 p-1 shadow
          transition-all duration-200 hover:bg-emerald-400 font-outfit
          hover:font-medium max-w-md block mx-auto"
          >
            Sign in
          </button>
        </fieldset>
      </form>
    </div>
  );
}
