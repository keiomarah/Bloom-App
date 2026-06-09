import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export function MenuIcon() {
  return (
    <div className="menu">
      <button className="menu-icon">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className="nav-links">
        <ul>
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
