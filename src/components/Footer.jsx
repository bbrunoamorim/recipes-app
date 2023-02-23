import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      className="fixed bottom-0 w-full mb-2"
    >
      <div
        className="flex justify-between bg-orange-400/95 rounded-full
        w-5/6 p-2 mx-auto max-w-4xl"
      >
        <Link to="/drinks">
          <img
            src="cocktail.png"
            alt="Ícone de Bebida"
            className="ml-3"
          />
        </Link>

        <Link to="/meals">
          <img
            src="meal.png"
            alt="Ícone de Comida"
            className="mr-3"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
