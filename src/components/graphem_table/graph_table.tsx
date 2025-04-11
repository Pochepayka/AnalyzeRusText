import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../heading/heading.tsx';

import { global_styles } from '../main_form/main_form.tsx';
import { table_styles } from '../main_form/main_form.tsx';

const Graph = () => {
  const { state } = useLocation();

  if (!state || !state?.data?.graph_res) {
    return (
      <div style={global_styles.errorContainer}>
        <div style={global_styles.errorCard}>
          <h2 style={global_styles.errorTitle}>Данные анализа не найдены</h2>
          <button 
            onClick={() => window.history.back()}
            style={global_styles.backButton}
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const graphData = state.data.graph_res;
  const headingText = "Графематический анализ";

  const translateTag = (tag: string) => {
    const translations: Record<string, string> = {
      
    };
    return translations[tag] || tag;
  };

  const renderDescriptors = (value: string) => {

    if (!value || value.length === 0) return <span style={table_styles.emptyValue}>[НЕТ]</span>;

    return String(value).split(' ').map((tag, i) => (
      <div style={table_styles.tagsContainer}>
        <span 
          key={i} 
          style={{
            ...table_styles.tag,
            ...getDescriptorStyle(tag.toLowerCase())
          }}
        >
          {translateTag(tag)}
        </span>
    </div>
      // <span 
      //   key={i} 
      //   style={{
      //     ...styles.descriptor,
      //     ...getDescriptorStyle(desc.toLowerCase())
      //   }}
      // >
      //   {desc}
      // </span>
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
    <div style={global_styles.container}>
      <div style={global_styles.card}>
        <Heading 
          headingText={headingText}
          timestamp={state?.timestamp} 
          text={state?.text} 
        />

        <div style={table_styles.tableContainer}>
          <table style={table_styles.table}>
            <thead>
              <tr>
                <th style={table_styles.tableHeader}>Токен</th>
                <th style={table_styles.tableHeader}>Дескрипторы</th>
              </tr>
            </thead>
            <tbody>
              {graphData.map((item: any, index: number) => {
                const token = Array.isArray(item) ? item[0] : item?.token || item?.key || 'N/A';
                const descriptors = Array.isArray(item) ? item[1] : item?.descriptors || item?.value || 'N/A';
                
                return (
                  <tr key={index} style={index % 2 === 0 ? table_styles.tableRow : table_styles.tableRowAlt}>
                    <td style={table_styles.tokenCell}>
                      {token === '␣' || token === ' ' ? (
                        <span style={table_styles.emptyValue}>[ПРОБЕЛ]</span>
                      ) : token}
                    </td>
                    <td style={table_styles.cell}>
                      <div style={table_styles.tagsContainer}>
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

// const styles = {
//   tableContainer: {
//     marginTop: '30px',
//     overflowX: 'auto' as const,
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse' as const,
//     borderRadius: '8px',
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     backgroundColor: '#f0f2f5',
//     padding: '12px 15px',
//     textAlign: 'left' as const,
//     fontWeight: 600 as const,
//     fontSize: '16px',
//     color: '#2d3748',
//   },
//   tableRow: {
//     backgroundColor: '#ffffff',
//     borderBottom: '1px solid #e2e8f0',
//   },
//   tableRowAlt: {
//     backgroundColor: '#f8fafc',
//     borderBottom: '1px solid #e2e8f0',
//   },
//   tokenCell: {
//     padding: '12px 15px',
//     fontSize: '15px',
//     color: '#2d3748',
//     fontWeight: 500 as const,
//   },
//   spaceChar: {
//     color: '#718096',
//     fontStyle: 'italic' as const,
//   },
//   descriptorsCell: {
//     padding: '12px 15px',
//   },
//   descriptorsWrapper: {
//     display: 'flex',
//     flexWrap: 'wrap' as const,
//     gap: '6px',
//   },
//   descriptor: {
//     padding: '4px 8px',
//     borderRadius: '4px',
//     fontSize: '14px',
//     color: '#2d3748',
//     whiteSpace: 'nowrap' as const,
//   },
// };

export default Graph;