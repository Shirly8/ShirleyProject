import { memo } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const TopBar = memo(() => {
  return (
    <header className="top-bar">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/work">WORK</Link></li>
          <li><Link to="/project">PROJECT</Link></li>
        </ul>
      </nav>
    </header>
  );
});

TopBar.displayName = 'TopBar';

export default TopBar;
