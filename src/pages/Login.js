import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Login() {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    handleSubmit,
  } = useContext(MyContext);

  return (
    <div
      className="flex min-h-screen items-center
      justify-center bg-[url('/public/background.jpg')]"
    >
      <form className="text-center bg-stone-100/95 p-4 mx-4 shadow rounded-lg">
        <img
          src="login-icon.svg"
          alt="meal-logo"
          width="100px"
          className="mb-12 inline"
        />
        <h1 className="mb-4 text-violet-700">Login</h1>
        <fieldset className="mb-3">
          <label htmlFor="Email" className="mb-2">
            <input
              data-testid="email-input"
              name="Email"
              value={ email }
              type="text"
              placeholder="Digite seu e-mail"
              onChange={ handleChangeEmail }
              className="px-3 py-2 rounded-lg w-full"
            />
          </label>
          <label htmlFor="Password" className="mb-2">
            <input
              data-testid="password-input"
              name="Password"
              value={ password }
              type="Password"
              placeholder="E aqui sua senha"
              onChange={ handleChangePassword }
              className="px-3 py-2 rounded-lg w-full"
            />
          </label>
        </fieldset>
        <fieldset className="flex justify-between items-center mb-3">
          <label htmlFor="remember" className="text-sm">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="mr-1
                accent-violet-700"
            />
            Lembrar de mim
          </label>
          <small className="text-right text-violet-500">Esqueceu sua senha?</small>
        </fieldset>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ submitDisable }
          onClick={ handleSubmit }
          className="bg-violet-700 text-white p-2 rounded-lg w-full hover:bg-violet-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
