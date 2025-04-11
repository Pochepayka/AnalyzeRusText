import React from 'react';
import { useNavigate } from 'react-router-dom';
import { global_styles } from '../main_form/main_form.tsx';

const Help: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={global_styles.container}>
      <div style={global_styles.card}>
        <h1 style={global_styles.title}>Справка по работе с системой</h1>
        <p style={global_styles.subtitle}>Здесь вы найдете информацию о возможностях системы и форматах данных</p>

        <h2 style={{ ...global_styles.errorTitle, marginBottom: '16px' }}>Виды лингвистического анализа</h2>
          
        <div style={global_styles.grayBlok}>
          <div style={{ marginBottom: '24px', marginTop:"0px" }}>
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px', marginTop:"0px" }}>1. Графематический анализ</h3>
            <p style={{ marginBottom: '12px' }}>
              Разбивает текст на токены (слова, знаки препинания). Пример вывода:
            </p>
            <pre style={{ 
              backgroundColor: '#edf2f7', 
              padding: '12px', 
              borderRadius: '6px',
              overflowX: 'auto'
            }}>
              {`[
  { "token": "Мама", "type": "WORD" },
  { "token": "мыла", "type": "WORD" },
  { "token": "раму", "type": "WORD" },
  { "token": ".", "type": "PUNCT" }
]`}
            </pre>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px' }}>2. Морфологический анализ</h3>
            <p style={{ marginBottom: '12px' }}>
              Определяет грамматические характеристики слов. Основные дескрипторы:
            </p>
            <ul style={{ marginBottom: '12px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '6px' }}><strong>POS</strong> - часть речи (NOUN, VERB, ADJ и др.)</li>
              <li style={{ marginBottom: '6px' }}><strong>Case</strong> - падеж (Nom, Gen, Dat, Acc, Ins, Loc)</li>
              <li style={{ marginBottom: '6px' }}><strong>Number</strong> - число (Sing, Plur)</li>
              <li style={{ marginBottom: '6px' }}><strong>Gender</strong> - род (Masc, Fem, Neut)</li>
              <li style={{ marginBottom: '6px' }}><strong>Tense</strong> - время (Past, Pres, Fut)</li>
            </ul>
          </div>

          <div style={{ marginBottom: '0px' }}>
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px' }}>3. Синтаксический анализ</h3>
            <p style={{ marginBottom: '12px' }}>
              Определяет связи между словами в предложении. Пример вывода:
            </p>
            <pre style={{ ...global_styles.blueBlok, marginBottom:"0px"
            }}>
              {`{
  "nodes": [
    { "id": 1, "text": "Мама", "pos": "NOUN" },
    { "id": 2, "text": "мыла", "pos": "VERB" }
  ],
  "edges": [
    { "from": 1, "to": 2, "type": "subject" }
  ]
}`}
            </pre>
          </div>
        </div>

        <h2 style={{ ...global_styles.errorTitle, marginBottom: '16px', marginTop:"0px" }}>Форматы ввода/вывода</h2>
        <div style={{...global_styles.grayBlok, marginBottom:"0px"}}>
          
          <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px' }}>Входные данные:</h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>Простой текст (до 5000 символов)</li>
            <li style={{ marginBottom: '6px' }}>Поддерживается кириллица и пунктуация</li>
            <li style={{ marginBottom: '6px' }}>Каждое предложение на новой строке</li>
          </ul>

          <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px' }}>Выходные данные:</h3>
          <ul style={{ marginBottom: '0px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>JSON-структура с результатами анализа</li>
            <li style={{ marginBottom: '6px' }}>Визуализация синтаксического дерева</li>
            <li style={{ marginBottom: '6px' }}>Возможность скачивания результатов</li>
          </ul>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '32px',
          gap: '16px'
        }}>
          <button
            style={global_styles.backButton}
            onClick={() => navigate('/')}
          >
            На главную
          </button>
          <button
            style={{ 
              ...global_styles.backButton,
              backgroundColor: '#e53e3e',
            //   ':hover': {
            //     backgroundColor: '#c53030',
            //   } as React.CSSProperties
            }}
            onClick={() => navigate('/contact')}
          >
            Задать вопрос
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;