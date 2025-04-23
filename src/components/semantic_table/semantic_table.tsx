import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../heading/heading.tsx';

import { global_styles } from '../main_form/main_form.tsx';
import { table_styles } from '../main_form/main_form.tsx';

const Semantic = () => {
  const { state } = useLocation();

  // Проверка наличия данных
  if (!state || !state?.data?.data) {
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

  const clausesData = Array.isArray(state.data.data) 
    ? state.data.data 
    : [];

  const headingText = "Семантический анализ предложения";
  
  // Стили для разных частей предложения
  const getRoleStyle = (role: string) => {
    const colors: Record<string, string> = {
      'Подлежащее': '#bbdefb',
      'Сказуемое': '#c8e6c9',
      'Дополнение': '#ffecb3',
      'Определение': '#d1c4e9',
      'Обстоятельство': '#b2ebf2',
      'DEFAULT': '#e0e0e0'
    };
    return colors[role] || colors['DEFAULT'];

  };

  // Стили для частей речи
  const getTypeStyle = (type: string) => {
    
    const colors: Record<string, string> = {
      'NOUN': '#e1f5fe',
      'VERB': '#f1f8e9',
      'ADJF': '#fff8e1',
      'ADVB': '#f3e5f5',
      'PRTF': '#e8f5e9',
      'GRND': '#e0f7fa',
      'DEFAULT': '#f5f5f5'
    };

    return colors[type] || colors['DEFAULT'];

  };


  const getItemData = (cell: any) => {
    if (!cell || cell.length == 0 || !cell[0].word ) {
      return <span style={table_styles.emptyValue}>[НЕТ]</span>;
    }
    
    return cell.map((item, index) => (
        <div key={index} style={{}}>
        <div style={table_styles.tokenCell}>
          {item.word}
        </div>
        <div style={table_styles.tagsContainer}>
          <span
            style={{
              ...table_styles.tag,
              backgroundColor: getRoleStyle(item.part_of_sentence)
            }}
          >
            {item.part_of_sentence || 'не опр.'}
          </span>
          <span
            style={{
              ...table_styles.tag,
              backgroundColor: getTypeStyle(item.type)
            }}
          >
            {item.type || 'не опр.'}
          </span>
        </div>
      </div>

    ));

  
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
                <th style={{...table_styles.tableHeader, width: '20%'}}>Субъект</th>
                <th style={{...table_styles.tableHeader, width: '20%'}}>Действие</th>
                <th style={{...table_styles.tableHeader, width: '20%'}}>Объект</th>
                <th style={{...table_styles.tableHeader, width: '5%'}}>Инструмент</th>
                <th style={{...table_styles.tableHeader, width: '5%'}}>Локация</th>
                <th style={{...table_styles.tableHeader, width: '5%'}}>Время</th>
                <th style={{...table_styles.tableHeader, width: '15%'}}>Обстоятельство</th>
              </tr>
            </thead>
            <tbody>
              {clausesData.length > 0 ? (
                clausesData.map((clause: any[], index: number) => {
                  const subject = clause[0] || [{}];
                  const action = clause[1] || [{}];
                  const object = clause[2] || [{}];
                  const tool = clause[3] || [{}];
                  const locate = clause[4] || [{}];
                  const time = clause[5] || [{}];
                  const circumstance = clause[6] || [{}];

                  return (
                    <tr key={index} style={index % 2 === 0 ? table_styles.tableRow : table_styles.tableRowAlt}>
                      <td style={table_styles.cell}>{getItemData(subject)}</td>
                      <td style={table_styles.cell}>{getItemData(action)}</td>
                      <td style={table_styles.cell}>{getItemData(object)}</td>
                      <td style={table_styles.cell}>{getItemData(tool)}</td>
                      <td style={table_styles.cell}>{getItemData(locate)}</td>
                      <td style={table_styles.cell}>{getItemData(time)}</td>
                      <td style={table_styles.cell}>{getItemData(circumstance)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} style={table_styles.emptyValue}>
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

export default Semantic;