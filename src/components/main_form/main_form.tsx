import React, { useState ,CSSProperties} from 'react';

import styled from '@emotion/styled';

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
    <div style={global_styles.container}>
      <div style={{...global_styles.card, maxWidth:"800px"}}>
        <h1 style={global_styles.title}>Анализатор русского текста</h1>
        <p style={global_styles.subtitle}>Выберите тип анализа и введите текст</p>
        
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


const table_styles = {
  
  tableContainer: {
    marginTop: '30px',
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#f0f2f5',
    padding: '12px 15px',
    textAlign: 'left' as const,
    fontWeight: 600 as const,
    fontSize: '16px',
    color: '#2d3748',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
  },
  tableRowAlt: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  tokenCell: {
    padding: '12px 15px',
    fontSize: '15px',
    color: '#2d3748',
    fontWeight: 500 as const,
  },
  cell: {
    padding: '12px 15px',
    fontSize: '14px',
    color: '#2d3748',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px',
  },
  tag: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#2d3748',
    whiteSpace: 'nowrap' as const,
  },
  emptyValue: {
    color: '#a0aec0',
    fontStyle: 'italic' as const,
  },
};

const global_styles :{
  container: CSSProperties;
  card: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  mainText: CSSProperties;
  grayBlok: CSSProperties;
  blueBlok: CSSProperties;
  errorContainer: CSSProperties;
  errorCard: CSSProperties;
  errorTitle: CSSProperties;
  backButton: CSSProperties;

}={
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Изменено с 'center' на 'flex-start' для корректного скролла
    marginTop: "60px",
    minHeight: 'calc(100vh - 60px - 281px)',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    width: "100%",
    boxSizing: 'border-box', // Добавлено для корректного расчета ширины с padding
    overflowX: 'hidden' // Запрещаем горизонтальный скролл
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    width: '100%',
    maxWidth: '800px',

    boxSizing: 'border-box', // Добавлено для корректного расчета ширины с padding
    //margin: '0 20px' // Добавляем отступы по бокам на мобильных устройствах
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
  mainText: {
    
  },
  grayBlok:{
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  blueBlok:{
    backgroundColor: '#edf2f7', 
    padding: '12px', 
    borderRadius: '6px',
    overflowX: 'auto',
    marginBottom: "20px",
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60px',
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  errorCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center' as const,
  },
  errorTitle: {
    color: '#2d3748',
    fontSize: '24px',
    marginBottom: '20px',
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500 as const,
    transition: 'background-color 0.2s',
    // ':hover': {
    //   backgroundColor: '#3182ce',
    // },
  },

}

const styles = {
  
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
    boxSizing: 'border-box' as const, // Важное исправление
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',

    fontFamily: 'inherit', // Для согласованности шрифтов
    fontSize: '16px',
    resize: 'vertical' as const,
    minHeight: '150px',
    transition: 'border-color 0.2s',
    '&:focus': {
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
    fontFamily: 'inherit', // Для согласованности шрифтов
    backgroundColor: '#ffffff',
    //transition: 'border-color 0.2s',
    // '&:focus': {
    //   outline: 'none',
    //   borderColor: '#4299e1',
    //   boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    // },
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
export {global_styles, table_styles};