import { useNavigate } from 'react-router-dom';
import React, { CSSProperties } from 'react';
import { global_styles } from '../main_form/main_form.tsx';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={global_styles.errorContainer}>
      <div style={global_styles.errorCard}>
        <div style={{ marginBottom: '32px' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E53E3E" strokeWidth="2"/>
            <path d="M12 8V12" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 16H12.01" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h1 style={{ 
          ...global_styles.errorTitle, 
          fontSize: '32px',
          marginBottom: '16px',
          color: '#2d3748'
        }}>
          404 - Страница не найдена
        </h1>
        
        <p style={{ 
          ...global_styles.subtitle, 
          fontSize: '18px',
          marginBottom: '40px',
          color: '#718096'
        }}>
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            style={{ 
              ...global_styles.backButton,
              backgroundColor: '#4299e1',
            }}
            onClick={() => navigate('/')}
          >
            На главную
          </button>
          
          <button
            style={{ 
              ...global_styles.whiteButton,
            }}
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>
        
        <div style={{ 
          ...global_styles.grayBlok,
          marginTop: '40px',
          textAlign: 'left'
        }}>
          <p style={{ marginBottom: '8px', fontWeight: 500 }}>Попробуйте следующие страницы:</p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <a 
                href="/" 
                style={{ 
                  color: '#4299e1',
                  textDecoration: 'none',
                }}
              >
                Главная страница
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a 
                href="/about" 
                style={{ 
                  color: '#4299e1',
                  textDecoration: 'none',
                }}
              >
                О проекте
              </a>
            </li>
            <li>
              <a 
                href="/help" 
                style={{ 
                  color: '#4299e1',
                  textDecoration: 'none',
                }}
              >
                Справка
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;