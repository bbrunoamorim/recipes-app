import waiting from '../images/waiting.png';

export default function Loading() {
  return (
    <img
      src={ waiting }
      alt="loading"
      className="w-20 mx-auto mt-24 animate-spin"
    />
  );
}
