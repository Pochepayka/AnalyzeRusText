import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../heading/heading.tsx';

const Morph = () => {
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

  const morphData = state.data.morph_res;
  const headingText = "Морфологический анализ";

  const translateTag = (tag: string) => {
    const translations: Record<string, string> = {
      'NOUN': 'сущ.', 'VERB': 'глаг.', 'ADJF': 'прил.', 'ADJS': 'кр.прил.',
      'COMP': 'комп.', 'INFN': 'инф.', 'PRTF': 'прич.', 'PRTS': 'кр.прич.',
      'GRND': 'деепр.', 'NUMR': 'числ.', 'ADVB': 'нареч.', 'NPRO': 'мест.',
      'PRED': 'предик.', 'PREP': 'предл.', 'CONJ': 'союз', 'PRCL': 'част.',
      'INTJ': 'межд.', 'nomn': 'им.', 'gent': 'род.', 'datv': 'дат.',
      'accs': 'вин.', 'ablt': 'тв.', 'loct': 'предл.', 'voct': 'зв.',
      'sing': 'ед.ч.', 'plur': 'мн.ч.', 'masc': 'м.р.', 'femn': 'ж.р.',
      'neut': 'ср.р.', 'anim': 'одуш.', 'inan': 'неодуш.', 'past': 'прош.',
      'pres': 'наст.', 'futr': 'буд.', 'perf': 'сов.в.', 'imperf': 'несов.в.',
      'tran': 'перех.', 'intr': 'неперех.', 'actv': 'действ.', 'pssv': 'страд.'
    };
    return translations[tag] || tag;
  };

  const renderCellContent = (value: string[] | undefined) => {
    if (!value || value.length === 0) return <span style={styles.emptyValue}>[НЕТ]</span>;
    
    return (
      <div style={styles.tagsContainer}>
        {value.map((tag, i) => (
          <span key={i} style={styles.tag}>
            {translateTag(tag)}
          </span>
        ))}
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
                <th style={{...styles.tableHeader, width: '15%'}}>Слово</th>
                <th style={{...styles.tableHeader, width: '14%'}}>Лемма</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Часть речи</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Падеж</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Число</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Род</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Время</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Одуш.</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Перех.</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Залог</th>
                <th style={{...styles.tableHeader, width: '8%'}}>Вид</th>
              </tr>
            </thead>
            <tbody>
              {morphData.map((word: any, index: number) => (
                <tr key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <td style={styles.tokenCell}>{word.word}</td>
                  <td style={styles.tokenCell}>{word.lemma}</td>
                  <td style={styles.cell}>{translateTag(word.pos)}</td>
                  <td style={styles.cell}>{renderCellContent(word.case)}</td>
                  <td style={styles.cell}>{renderCellContent(word.number)}</td>
                  <td style={styles.cell}>{renderCellContent(word.gender)}</td>
                  <td style={styles.cell}>{renderCellContent(word.tense)}</td>
                  <td style={styles.cell}>{renderCellContent(word.animacy)}</td>
                  <td style={styles.cell}>{renderCellContent(word.trans)}</td>
                  <td style={styles.cell}>{renderCellContent(word.pledge)}</td>
                  <td style={styles.cell}>{renderCellContent(word.type)}</td>
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
    tableLayout: 'fixed' as const,
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
    gap: '6px',
  },
  tag: {
    backgroundColor: '#e1f5fe',
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

export default Morph;