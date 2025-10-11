import { Link } from 'react-router-dom';

// Logo
export default function Logo() {
  return (
    <Link to="/">
      <h1 className="font-figtree text-xl font-normal text-foreground hover:text-primary transition-colors">
        FilmArchive
      </h1>
    </Link>
  );
}
