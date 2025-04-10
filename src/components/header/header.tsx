import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Основные стили
  const headerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const navContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: '30px',
    height: '100%',
    alignItems: 'center',
  };

  const navButtonStyles: React.CSSProperties = {
    color: '#4a5568',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  };

  const navButtonHoverStyles: React.CSSProperties = {
    backgroundColor: '#f7fafc',
    color: '#2d3748',
  };

  // Состояние для отслеживания наведения
  const [hoverStates, setHoverStates] = React.useState({
    home: false,
    about: false,
    help: false,
  });

  return (
    <header style={headerStyles}>
      <nav style={navContainerStyles}>
        <Link
          to="/"
          style={{
            ...navButtonStyles,
            ...(hoverStates.home ? navButtonHoverStyles : {}),
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, home: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, home: false})}
        >
          Главная
        </Link>
        <Link
          to="/about"
          style={{
            ...navButtonStyles,
            ...(hoverStates.about ? navButtonHoverStyles : {}),
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, about: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, about: false})}
        >
          О проекте
        </Link>
        <Link
          to="/help"
          style={{
            ...navButtonStyles,
            ...(hoverStates.help ? navButtonHoverStyles : {}),
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, help: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, help: false})}
        >
          Справка
        </Link>
      </nav>
    </header>
  );
};

export default Header;