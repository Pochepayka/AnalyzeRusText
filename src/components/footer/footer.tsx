// footer.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.heading}>Анализатор русского текста</h3>
          <p style={styles.text}>
            Профессиональный инструмент для лингвистического анализа текстов
            на русском языке
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Контакты</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.label}>Email:</span>
              <a href="mailto:pochepayka@gmail.com" style={styles.link}>
                pochepayka@gmail.com
              </a>
            </li>
            <li style={styles.listItem}>
              <span style={styles.label}>Телефон:</span>
              <a href="tel:+78001234567" style={styles.link}>
                +7 (800) 123-45-67
              </a>
            </li>
            <li style={styles.listItem}>
              <span style={styles.label}>Адрес:</span>
              <span style={styles.text} >г. Москва, ул. Лингвистическая, д. 42</span>
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Социальные сети</h3>
          <div style={styles.socialLinks}>
            <a href="https://vk.com/vladimir_potsepai" style={styles.socialLink}>VK</a>
            <a href="https://t.me/Pochepayka" style={styles.socialLink}>Telegram</a>
            <a href="https://github.com/Pochepayka" style={styles.socialLink}>GitHub</a>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        © {new Date().getFullYear()} Анализатор русского текста. Все права защищены.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2d3748',
    color: '#ffffff',
    padding: '40px 20px 20px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '30px',
  },
  section: {
    flex: '1',
    minWidth: '250px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px',
    color: '#e2e8f0',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#a0aec0',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap' as const,
  },
  label: {
    width: '80px',
    color: '#e2e8f0',
    fontSize: '14px',
  },
  link: {
    color: '#63b3ed',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
    ':hover': {
      color: '#4299e1',
      textDecoration: 'underline',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
  },
  socialLink: {
    color: '#63b3ed',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
    ':hover': {
      color: '#4299e1',
    },
  },
  copyright: {
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#a0aec0',
    paddingTop: '20px',
    marginTop: '20px',
    borderTop: '1px solid #4a5568',
  },
};

export default Footer;