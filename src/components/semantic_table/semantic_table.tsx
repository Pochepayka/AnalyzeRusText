import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../heading/heading.tsx';

const Semantic = () => {
  const { state } = useLocation();

  // Проверка наличия данных
  if (!state?.data?.data) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>Данные анализа не найдены</h2>
          <button 
            onClick={() => window.history.back()}
            style={styles.backButton}
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const clausesData = Array.isArray(state.data.data) 
    ? state.data.data 
    : [];
  const headingText = "Семантический анализ предложения";

  const getItemData = (item: any) => {
    if (!item || !item[0] || !item[0].word) {
      return <span style={styles.emptyValue}>[НЕТ]</span>;
    }
  
    const { word, type, part_of_sentence } = item[0];
    
    // Стили для разных частей предложения
    const getRoleStyle = (role: string | undefined) => {
      const baseStyle = {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#2d3748',
        whiteSpace: 'nowrap' as const,
      };
  
      switch(role) {
        case 'Подлежащее':
          return { ...baseStyle, backgroundColor: '#bbdefb'};
        case 'Сказуемое':
          return { ...baseStyle, backgroundColor: '#c8e6c9'};
        case 'Дополнение':
          return { ...baseStyle, backgroundColor: '#ffecb3'};
        case 'Определение':
          return { ...baseStyle, backgroundColor: '#d1c4e9'};
        case 'Обстоятельство':
          return { ...baseStyle, backgroundColor: '#b2ebf2' };
        default:
          return { ...baseStyle, backgroundColor: '#e0e0e0' };
      }
    };
  
    // Стили для частей речи
    const getTypeStyle = (type: string | undefined) => {
      const baseStyle = {
  
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#2d3748',
          whiteSpace: 'nowrap' as const,

      };
  
      switch(type) {
        case 'NOUN':
          return { ...baseStyle, backgroundColor: '#e1f5fe' };
        case 'VERB':
          return { ...baseStyle, backgroundColor: '#f1f8e9' };
        case 'ADJF':
          return { ...baseStyle, backgroundColor: '#fff8e1'};
        case 'ADVB':
          return { ...baseStyle, backgroundColor: '#f3e5f5' };
        case 'PRTF':
          return { ...baseStyle, backgroundColor: '#e8f5e9' };
        case 'GRND':
          return { ...baseStyle, backgroundColor: '#e0f7fa' };
        default:
          return { ...baseStyle, backgroundColor: '#f5f5f5' };
      }
    };
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <span style={{ 
          fontWeight: 500,
          marginRight: '4px',
          alignSelf: 'center'
        }}>
          {word}
        </span>
        <span style={getRoleStyle(part_of_sentence)}>
          {part_of_sentence || 'не опр.'}
        </span>
        <span style={getTypeStyle(type)}>
          {type || 'не опр.'}
        </span>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Heading 
          headingText={headingText}
          timestamp={state?.timestamp} 
          text={state?.text} 
        />

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{...styles.tableHeader, width: '35%'}}>Субъект</th>
                <th style={{...styles.tableHeader, width: '30%'}}>Действие</th>
                <th style={{...styles.tableHeader, width: '35%'}}>Объект</th>
              </tr>
            </thead>
            <tbody>
              {clausesData.length > 0 ? (
                clausesData.map((clause: any[], index: number) => {
                  const subject = clause[1] || [{}];
                  const action = clause[0] || [{}];
                  const object = clause[2] || [{}];

                  return (
                    <tr key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                      <td style={styles.subjectCell}>{getItemData(subject)}</td>
                      <td style={styles.actionCell}>{getItemData(action)}</td>
                      <td style={styles.objectCell}>{getItemData(object)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} style={styles.emptyCell}>
                    Нет данных для отображения
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60px',
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
    maxWidth: '1200px',
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
    ':hover': {
      backgroundColor: '#3182ce',
    },
  },
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
    fontSize: '15px',
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
  subjectCell: {
    padding: '12px 15px',
    fontSize: '15px',
    color: '#2d3748',
    // fontWeight: 500 as const,
  },
  actionCell: {
    padding: '12px 15px',
    fontSize: '15px',
    //color: '#3182ce',

    color: '#2d3748',
    //fontWeight: 500 as const,
  },
  objectCell: {
    padding: '12px 15px',
    fontSize: '15px',
    color: '#2d3748',
    // fontWeight: 500 as const,
  },
  indexCell: {
    padding: '12px 15px',
    fontSize: '14px',
    color: '#718096',
    // textAlign: 'center' as const,
  },
  emptyCell: {
    padding: '20px',
    textAlign: 'center' as const,
    color: '#718096',
    fontSize: '16px',
  },
  emptyValue: {
    color: '#a0aec0',
    fontStyle: 'italic' as const,
  },
};

export default Semantic;