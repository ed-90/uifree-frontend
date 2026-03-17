import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Github, Menu } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-highlight">UI</span>free
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Главная</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>О проекте</Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;