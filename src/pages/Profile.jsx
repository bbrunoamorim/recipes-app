import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const logoutProfile = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div className="font-outfit">
      <Header title="Profile" notSearchIcon />
      <div className="flex flex-col items-center my-3 divide-y-2 divide-gray-600">
        <p className="my-5 text-lg font-medium text-orange-500">{ user.email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className=" mt-5 mb-3 p-2 bg-emerald-300 rounded-lg w-60 hover:bg-emerald-400
          hover:font-semibold transition-all duration-150 cursor-pointer"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="my-3 p-2 bg-emerald-300 rounded-lg w-60 hover:bg-emerald-400
          hover:font-semibold transition-all duration-150 cursor-pointer"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutProfile }
          className="my-3 p-2 bg-emerald-300 rounded-lg w-60 hover:bg-emerald-400
          hover:font-semibold transition-all duration-150 cursor-pointer"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
