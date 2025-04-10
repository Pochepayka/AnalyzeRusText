import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../heading/heading.tsx';

const Splitter = () => {
  const { state } = useLocation();

  if (!state) {
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

  const clausesData = state.data.clauses_res;
  const headingText = "Разделение на клаузы";

  // Функция для стилизации союзов
  const renderConjunctions = (conjunctions: string[]) => {
    return (
      <div style={styles.tagsContainer}>
        {conjunctions.map((conj, index) => (
          <span 
            key={index} 
            style={{
              ...styles.tag,
              backgroundColor: conj === 'а' ? '#e1f5fe' : '#c8e6c9'
            }}
          >
            {conj}
          </span>
        ))}
      </div>
    );
  };

  // Функция для стилизации дескрипторов
  const renderDescriptors = (descriptor: string) => {
    return descriptor.split(' ').map((desc, i) => (
      <span 
        key={i} 
        style={{
          ...styles.descriptor,
          backgroundColor: getDescriptorColor(desc)
        }}
      >
        {desc}
      </span>
    ));
  };

  // Цвета для разных типов дескрипторов
  const getDescriptorColor = (type: string) => {
    const colors: Record<string, string> = {
      'PUN': '#ffecb3',
      'SENT_END': '#ffecb3',
      'COORD_CONJ': '#bbdefb',
      'SUB_CONJ': '#d1c4e9',
      'RLE': '#c8e6c9',
      'DEFAULT': '#e1f5fe'
    };
    return colors[type] || colors['DEFAULT'];
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
                <th style={{...styles.tableHeader, width: '40%'}}>Клауза</th>
                <th style={{...styles.tableHeader, width: '15%'}}>Сепаратор</th>
                <th style={{...styles.tableHeader, width: '25%'}}>Дескриптор</th>
                <th style={{...styles.tableHeader, width: '20%'}}>Союзы</th>
              </tr>
            </thead>
            <tbody>
              {clausesData.map((clause: any, index: number) => (
                <tr key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <td style={styles.clauseCell}>
                    {clause.tokens.map((token: any) => token.word).join(' ')}
                  </td>
                  <td style={styles.cell}>
                    {clause.separator || <span style={styles.emptyValue}>[НЕТ]</span>}
                  </td>
                  <td style={styles.cell}>
                    <div style={styles.descriptorsWrapper}>
                      {renderDescriptors(clause.descriptor)}
                    </div>
                  </td>
                  <td style={styles.cell}>
                    {renderConjunctions([
                      ...clause.coord_conjunctions,
                      ...clause.sub_conjunctions
                    ])}
                  </td>
                </tr>
              ))}
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
  clauseCell: {
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
  descriptorsWrapper: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  descriptor: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#2d3748',
    whiteSpace: 'nowrap' as const,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
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

export default Splitter;