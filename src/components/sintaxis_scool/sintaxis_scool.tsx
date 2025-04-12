// SintaxisTree.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../heading/heading.tsx';
import SyntaxVisualizer from '../visual_sintaxis_analyze/visual_sintaxis_analyze.tsx';

import { global_styles } from '../main_form/main_form.tsx';

const SintaxisScool = () => {
  const { state } = useLocation();

  if (!state || !state?.data?.tokens || !state?.data?.links || !state?.data?.sintaxis_text_info) {
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

  const [
    infoCountSent,
    infoCountPartSent,
    infoTwoPart,
    infoPurposeStatement,
    infoIntonation,
    infoComplexity,
    infoCommon,
    infoHomogeneous
  ] = state.data.sintaxis_text_info;

  const getPurposeStatement = (value) => {
    switch (value) {
      case 0: return "повествовательное";
      case 1: return "побудительное";
      default: return "вопросительное";
    }
  };

  const getIntonation = (value) => {
    return value ? "восклицательное" : "невосклицательное";
  };

  const getComplexity = (value) => {
    switch (value) {
      case 0: return "СПП";
      case 1: return "ССП";
      default: return "простое";
    }
  };

  const getTwoPart = (value) => {
    return value ? "двусоставное" : "односоставное";
  };



  const headingText = "Синтаксический разбор";

  const tokens = 
  [
    { id: '1', text: 'Мама', pos: 'SUBJECT' },
    { id: '2', text: 'мыла', pos: 'PREDICATE' },
    { id: '3', text: 'раму', pos: 'OBJECT' },
    { id: '4', text: 'папа', pos: 'SUBJECT' },
    { id: '5', text: 'окно', pos: 'OBJECT' },
    { id: '6', text: 'Миша', pos: 'SUBJECT' },
    { id: '7', text: 'гулял', pos: 'PREDICATE' },
    { id: '8', text: 'во', pos: 'CIRCUMSTANCE' },
    { id: '9', text: 'дворе', pos: 'CIRCUMSTANCE' },
    { id: '10', text: 'кошка', pos: 'SUBJECT' },
    { id: '11', text: 'спала', pos: 'PREDICATE' },
    { id: '12', text: 'на', pos: 'CIRCUMSTANCE' },
    { id: '13', text: 'диване', pos: 'CIRCUMSTANCE' },
  ];

  const links = 
  [
    { from: '1', to: '2', type: 'subject' },
    { from: '2', to: '3', type: 'object' },
    { from: '4', to: '5', type: 'object' },
    { from: '6', to: '7', type: 'subject' },
    { from: '7', to: '8', type: 'circumstance' },
    { from: '8', to: '9', type: 'circumstance' },
    { from: '10', to: '11', type: 'subject' },
    { from: '11', to: '12', type: 'circumstance' },
    { from: '12', to: '13', type: 'circumstance' },
  ];


  return (
    <div style={global_styles.container}>
      <div style={global_styles.card}>
        <Heading 
          headingText={headingText}
          timestamp={state?.timestamp} 
          text={state?.text} 
        />
        <div style={global_styles.grayBlok}>
          <SyntaxVisualizer
          tokens={state.data.tokens} links={state.data.links}
          />
        </div>

        <h2 style={global_styles.Title2}>Информация о тексте:</h2>
        <div style={{...global_styles.grayBlok, marginBottom:"0px" }}>
            {/* <p style={{whiteSpace: 'pre-line', marginTop:"0px", marginBottom:"0px"}}>{state.data.sintaxis_text_info_txt}</p> */}
            
            <h3 style={global_styles.Title3}>Количество предложений: {infoCountSent}</h3>
            
            {Array.from({ length: infoCountSent }).map((_, i) => (
              <div key={i} style={{ marginLeft: '20px', marginBottom:"0px", marginTop:"0px"  }}>
                <h4 style={{ marginBottom:"10px", marginTop:"0px", color: '#2d3748',  }}><strong>Предложение {i + 1}:</strong></h4>
                <ul style={{ listStyleType: 'none', paddingLeft: '20px', marginBottom:"0px", marginTop:"0px" }}>
                  <li>По цели высказывания: <strong style={{color: '#2d3748',}}>{getPurposeStatement(infoPurposeStatement[i])}</strong></li>
                  <li>По интонации: <strong style={{color: '#2d3748',}}>{getIntonation(infoIntonation[i])}</strong></li>
                  <li>По сложности: <strong style={{color: '#2d3748',}}>{getComplexity(infoComplexity[i])}</strong></li>
                  <li>Количество частей: <strong style={{color: '#2d3748',}}>{infoCountPartSent[i]}</strong></li>
                  <li>По наличию главных членов: <strong style={{color: '#2d3748',}}>{getTwoPart(infoTwoPart[i])}</strong></li>
                  <li>По наличию второстепенных членов: <strong style={{color: '#2d3748',}}>{infoHomogeneous[i] ? 'Да' : 'Нет'}</strong></li>
                  <li>По наличию однородных членов: <strong style={{color: '#2d3748',}}>{infoCommon[i] ? 'Да' : 'Нет'}</strong></li>
                </ul>
              </div>
            ))}
        </div>


      </div>
    </div>
  );
};


export default SintaxisScool;