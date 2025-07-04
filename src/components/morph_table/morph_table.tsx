import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../heading/heading.tsx';

import { global_styles } from '../main_form/main_form.tsx';
import { table_styles } from '../main_form/main_form.tsx';

const Morph = () => {
  const { state } = useLocation();

  if (!state || !state?.data?.morph_res) {
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

  const morphData = state.data.morph_res;
  const headingText = "Морфологический анализ";

  // Уникальные цвета для значений внутри категории
  const getValueColor = (value: string, category: string) => {
    const valueHashes: Record<string, Record<string, string>> = {
      'case': {
      'nomn': '#e7f4fb', // Светлый голубой
      'gent': '#b3e0ea', // Нежный голубоватый
      'datv': '#81d4fa', // Мягкий голубой
      'accs': '#a3c4e1', // Более осветленный спокойный голубовато-синий
      'ablt': '#4fc3f7', // Осветленный светло-синий
      'loct': '#63c3f1', // Более осветленный яркий, но нежный синий
      'voct': '#1e88e5'  // Осветленный более насыщенный глубокий синий
      },



      'number': {
        'sing': '#f1f8e9', 'plur': '#dcedc8'
      },
      'gender': {
        'masc': '#fff8e1', 'femn': '#ffecb3', 'neut': '#ffe082'
      },
      'tense': {
        'past': '#f3e5f5', 'pres': '#e1bee7', 'futr': '#ce93d8'
      },
      'animacy': {
        'anim': '#ffebee', 'inan': '#ffcdd2'
      },

      'pledge': {
        'activ': '#E8F5E9',  // Светло-зелёный (активный залог)
        'passiv': '#C8E6C9'  // Мягкий зелёный (пассивный залог)
      },

      'trans': {
        'trans': '#FFF3E0',  // Светло-оранжевый (переходный)
        'intrans': '#FFE0B2' // Персиковый (непереходный)
      },

      'type': {
        'perf': '#E1F5FE',   // Лёдный голубой (совершенный)
        'imperf': '#B3E5FC'   // Нежный аквамарин (несовершенный)
      },

      "pos" : {
        'NOUN': '#F2A6A6',          // Нежный светлый розовый
        'VERB': '#E78F8F',          // Тёплый коралловый
        'ADJF': '#D77C7C',          // Тёплый розовато-коричневый
        'ADJF_SHORT': '#E6B2B2',    // Светлый пудровый
        'ADVB': '#E28989',          // Нежный розовато-бежевый
        'INFI': '#D87171',          // Приглушённый терракотовый
        'NPRO': '#F5A2A2',          // Очень светлый розовый
        'PREP': '#E6B3B3',          // Светлый серовато-розовый
        'CONJ': '#DFA0A0',          // Светлый розово-бежевый
        'PARTICIPLE': '#C46969',    // Приглушенный красный
        'PARTICIPLE_SHORT': '#C56666', // Тёплый розово-коричневый
        'ADVB_PARTICIPLE': '#B15858',  // Нежный бордовый
        'PART': '#F1B3B3',          // Светлый пыльно-розовый
        'NOUN_ADJF': '#E79A9A',     // Нежный розовый (сущ.+прил.)
        'NPRO_ADJF': '#F2C2C2'      // Очень светлый бежевато-розовый (мест.+прил.)
      }
      
      
      ,
      'default': {'default':'#e1f5fe'}
    };
    
    return valueHashes[category]?.[value] || valueHashes['default']['default'];
  };

  const translateTag = (tag: string) => {
    const translations: Record<string, string> = {
      'NOUN': 'сущ.', 'VERB': 'глаг.', 'ADJF': 'прил.', 'ADJF_SHORT': 'кр.прил.',
      'COMP': 'комп.', 'INFI': 'инф.', 'PARTICIPLE': 'прич.', 'PARTICIPLE_SHORT': 'кр.прич.',
      'ADVB_PARTICIPLE': 'деепр.', 'NUMR': 'числ.', 'ADVB': 'нареч.', 'NPRO': 'мест.',
      'NOUN_ADJF': 'числ.', 'PREP': 'предл.', 'CONJ': 'союз', 'PART': 'част.',
      'NPRO_ADJF': 'мест.', 'nomn': 'им.', 'gent': 'род.', 'datv': 'дат.',
      'accs': 'вин.', 'ablt': 'тв.', 'loct': 'предл.', 'voct': 'зв.',
      'sing': 'ед.ч.', 'plur': 'мн.ч.', 'masc': 'м.р.', 'femn': 'ж.р.',
      'neut': 'ср.р.', 'anim': 'одуш.', 'inan': 'неодуш.', 'past': 'прош.',
      'pres': 'наст.', 'futr': 'буд.', 'perf': 'сов.', 'imperf': 'несов.',
      'trans': 'перех.', 'intrans': 'неперех.', 'activ': 'действ.', 'passiv': 'страд.'
    };
    return translations[tag] || tag;
  };

  const renderCellContent = (value: string[] , category: string) => {

    if (!value || value.length === 0) return <span style={table_styles.emptyValue}>[НЕТ]</span>;
    
    return value.map((tag, i) => (
      <div style={value.length != i+1 ?  {...table_styles.tagsContainer, marginBottom:"5px"}:{...table_styles.tagsContainer,marginBottom:"0px"} }>
          <span 
            key={i} 
            style={{
              ...table_styles.tag,
              backgroundColor: getValueColor(tag, category)
            }}
          >
            {translateTag(tag)}
          </span>
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
                <th style={{...table_styles.tableHeader, width: '15%'}}>Слово</th>
                <th style={{...table_styles.tableHeader, width: '14%'}}>Лемма</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Часть речи</th>
                <th style={{...table_styles.tableHeader, width: '8%',}}>Падеж</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Число</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Род</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Время</th>
                <th style={{...table_styles.tableHeader, width: '8%',}}>Одуш.</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Перех.</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Залог</th>
                <th style={{...table_styles.tableHeader, width: '8%', }}>Вид</th>
              </tr>
            </thead>
            <tbody>
              {morphData.map((word: any, index: number) => (
                <tr key={index} style={index % 2 === 0 ? table_styles.tableRow : table_styles.tableRowAlt}>
                  <td style={table_styles.tokenCell}>{word.word}</td>
                  <td style={table_styles.tokenCell}>{word.lemma}</td>
                  
                  <td style={table_styles.cell}>{renderCellContent([word.pos], 'pos')}</td> 
                  <td style={table_styles.cell}>{renderCellContent(word.case, 'case')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.number, 'number')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.gender, 'gender')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.tense, 'tense')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.animacy, 'animacy')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.trans, 'trans')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.pledge, 'pledge')}</td>
                  <td style={table_styles.cell}>{renderCellContent(word.type, 'type')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Morph;