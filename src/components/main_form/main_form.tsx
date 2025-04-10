import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [text, setText] = useState('');
  const [optionValue, setOptionValue] = useState('GraphematicAnalyze');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const options = [
    { value: 'GraphematicAnalyze', label: 'Графематический анализ' },
    { value: 'MorphAnalyze', label: 'Морфологический анализ' },
    { value: 'SintaxisAnalyze', label: 'Синтаксический разбор' },
    { value: 'BuildSintaxisTree', label: 'Построение синтаксического дерева' },
    { value: 'SemanticAnalize', label: 'Семантический анализ' },
    { value: 'Spliter', label: 'Разделение на клаузы' },
  ];

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/' + optionValue, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      navigate(`/analysis/${optionValue}`, {
        state: {
          text,
          data,
          timestamp: new Date().toISOString()
        }
      });
      
    } catch (err) {
      setError(`Ошибка анализа: ${err.message}`);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Анализатор русского текста</h1>
        <p style={styles.subtitle}>Выберите тип анализа и введите текст</p>
        
        <div style={styles.formGroup}>
          <label htmlFor="text-input" style={styles.label}>
            Текст для анализа:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.textarea}
            placeholder="Введите или вставьте текст здесь..."
            rows={8}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="analysis-type" style={styles.label}>
            Тип анализа:
          </label>
          <select
            id="analysis-type"
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}
            style={styles.select}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !text.trim()}
          style={{
            ...styles.button,
            ...(isLoading || !text.trim() ? styles.buttonDisabled : {}),
          }}
        >
          {isLoading ? (
            <span style={styles.buttonLoading}>
              <span style={styles.spinner}></span>
              Анализируется...
            </span>
          ) : (
            'Анализировать'
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "60px",
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    width: '100%',
    maxWidth: '800px',
  },
  title: {
    fontSize: '28px',
    color: '#2d3748',
    marginBottom: '8px',
    marginTop: "0px",
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
    marginBottom: '32px',
    textAlign: 'center' as const,
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#4a5568',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical' as const,
    minHeight: '150px',
    transition: 'border-color 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    },
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    },
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4299e1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3182ce',
    },
    ':disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
    ':hover': {
      backgroundColor: '#a0aec0',
    },
  },
  buttonLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: 'spin 1s ease-in-out infinite',
  },
  error: {
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    borderRadius: '8px',
    fontSize: '14px',
  },
};

export default Home;