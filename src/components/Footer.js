import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="flex bg-violet-600 min-w-full justify-between p-2"
    >
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src="cocktail.png"
          alt="Ícone de Bebida"
          className="ml-3"
        />
      </Link>

      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src="meal.png"
          alt="Ícone de Comida"
          className="mr-3"
        />
      </Link>
    </footer>
  );
}

export default Footer;
