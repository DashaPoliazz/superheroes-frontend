import { Link } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Superheroes
      </Link>
    </header>
  );
};
