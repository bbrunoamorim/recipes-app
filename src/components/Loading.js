import loading from '../images/loading.png';

export default function Loading() {
  return (
    <img
      src={ loading }
      alt="loading"
      className="w-40 mx-auto mt-10 animate-spin"
    />
  );
}
