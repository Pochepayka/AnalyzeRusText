import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../heading/heading.tsx';

import { global_styles } from '../main_form/main_form.tsx';
import { table_styles } from '../main_form/main_form.tsx';

const Splitter = () => {
  const { state } = useLocation();

  if (!state|| !state?.data?.clauses_res) {
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

  const clausesData = state.data.clauses_res;
  const headingText = "Разделение на клаузы";

  // Функция для стилизации союзов
  const renderConjunctions = (conjunctions: string[]) => {
    return (
      <div style={table_styles.tagsContainer}>
        {conjunctions.map((conj, index) => (
          <span 
            key={index} 
            style={{
              ...table_styles.tag,
              backgroundColor: conj === 'а' ? '#e1f5fe' : '#c8e6c9'
            }}
          >
            {conj}
          </span>
        ))}
      </div>
    );
  };

  const translateTag = (tag: string) => {
    const translations: Record<string, string> = {
      
    };
    return translations[tag] || tag;
  };

  // Функция для стилизации дескрипторов
  const renderDescriptors = (value: string) => {
    return value.split(' ').map((tag, i) => (
      <div style={table_styles.tagsContainer}>
        <span 
          key={i} 
          style={{
            ...table_styles.tag,
            backgroundColor: getDescriptorColor(tag)
          }}
        >
          {translateTag(tag)}
        </span>
      </div>
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
                <th style={{...table_styles.tableHeader, width: '40%'}}>Клауза</th>
                <th style={{...table_styles.tableHeader, width: '15%'}}>Сепаратор</th>
                <th style={{...table_styles.tableHeader, width: '25%'}}>Дескриптор</th>
                <th style={{...table_styles.tableHeader, width: '20%'}}>Союзы</th>
              </tr>
            </thead>
            <tbody>
              {clausesData.map((clause: any, index: number) => (
                <tr key={index} style={index % 2 === 0 ? table_styles.tableRow : table_styles.tableRowAlt}>
                  <td style={table_styles.tokenCell}>
                    {clause.tokens.map((token: any) => token.word).join(' ')}
                  </td>
                  <td style={table_styles.cell}>
                    {clause.separator || <span style={table_styles.emptyValue}>[НЕТ]</span>}
                  </td>
                  <td style={table_styles.cell}>
                    <div style={table_styles.tagsContainer}>
                      {renderDescriptors(clause.descriptor)}
                    </div>
                  </td>
                  <td style={table_styles.cell}>
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


export default Splitter;