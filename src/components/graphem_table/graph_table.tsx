import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../heading/heading.tsx';

const Graph = () => {
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

  const graphData = state.data.graph_res;
  const headingText = "Графематический анализ";

  const renderDescriptors = (descriptors: string) => {
    return String(descriptors).split(' ').map((desc, i) => (
      <span 
        key={i} 
        style={{
          ...styles.descriptor,
          ...getDescriptorStyle(desc.toLowerCase())
        }}
      >
        {desc}
      </span>
    ));
  };

  const getDescriptorStyle = (type: string) => {
    const stylesMap: Record<string, React.CSSProperties> = {
      'pun': { backgroundColor: '#ffecb3' },
      'sent_end': { backgroundColor: '#ffecb3' },
      'del': { backgroundColor: '#ffcdd2' },
      'spc': { backgroundColor: '#ffcdd2' },
      'rle': { backgroundColor: '#c8e6c9' },
      'beg': { backgroundColor: '#bbdefb' },
      'nam': { backgroundColor: '#bbdefb' },
    };
    return stylesMap[type] || { backgroundColor: '#e1f5fe' };
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
                <th style={styles.tableHeader}>Токен</th>
                <th style={styles.tableHeader}>Дескрипторы</th>
              </tr>
            </thead>
            <tbody>
              {graphData.map((item: any, index: number) => {
                const token = Array.isArray(item) ? item[0] : item?.token || item?.key || 'N/A';
                const descriptors = Array.isArray(item) ? item[1] : item?.descriptors || item?.value || 'N/A';
                
                return (
                  <tr key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                    <td style={styles.tokenCell}>
                      {token === '␣' || token === ' ' ? (
                        <span style={styles.spaceChar}>[ПРОБЕЛ]</span>
                      ) : token}
                    </td>
                    <td style={styles.descriptorsCell}>
                      <div style={styles.descriptorsWrapper}>
                        {renderDescriptors(descriptors)}
                      </div>
                    </td>
                  </tr>
                );
              })}
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
  spaceChar: {
    color: '#718096',
    fontStyle: 'italic' as const,
  },
  descriptorsCell: {
    padding: '12px 15px',
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
};

export default Graph;