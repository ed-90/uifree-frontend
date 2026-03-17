import { Link } from 'react-router-dom';
import { Github, Sparkles } from 'lucide-react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        {/* Верхняя часть — только самое важное */}
        <div className="footer-content">
          <div className="footer-section brand">
            <h3>UI<span className="highlight">free</span></h3>
            <p>Бесплатные UI компоненты, сгенерированные AI. Каждый день новые элементы для ваших проектов.</p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener" className="social-link">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Одна колонка с самыми нужными ссылками */}
          <div className="footer-section">
            <h4>Информация</h4>
            <ul>
              <li><Link to="/about">О проекте</Link></li>
              <li><Link to="/about#disclaimer">Дисклеймер</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Нижняя часть — копирайт и бейджи */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} UIfree. Бесплатные UI-компоненты.</p>
          <div className="footer-badges">
            <span className="badge">🚀 Free forever</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;