import React from 'react';
import { useNavigate } from 'react-router-dom';
import { global_styles } from '../main_form/main_form.tsx';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={global_styles.container}>
      <div style={global_styles.card}>
        <h1 style={global_styles.title}>О проекте</h1>
        <p style={global_styles.subtitle}>Лингвистический анализатор текстов на естественном языке</p>

        <h2 style={{ ...global_styles.errorTitle, marginBottom: '16px' }}>Технологическая основа</h2>
        <div style={{...global_styles.grayBlok, marginTop:"0px"}}>
          
          <div style={{ marginBottom: '24px', marginTop:"0px" }}>
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px', marginTop:"0px" }}>Библиотека pylem</h3>
            <p style={{ marginBottom: '12px' }}>
              В проекте используется модифицированная версия библиотеки <strong>pylem </strong> 
              для морфологического анализа русскоязычных текстов.
            </p>
            <p>
              Pylem предоставляет точный морфологический разбор слов с определением:
            </p>
            <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '6px' }}>Части речи (существительное, глагол, прилагательное и др.)</li>
              <li style={{ marginBottom: '6px' }}>Грамматических характеристик (падеж, число, род, время и др)</li>
              <li style={{ marginBottom: '6px' }}>Нормальной формы слова (лемматизация)</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px' }}>Ресурсы проекта AOT.RU</h3>
            <p style={{ marginBottom: '12px' }}>
              В системе используются языковые модели и данные из проекта <strong>AOT.RU</strong> - 
              одного из наиболее полных открытых морфологических словарей русского языка.
            </p>
            <p>
              Словарь содержит более 600 тысяч словоформ с морфологическими разборами.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px' }}>Собственный аналитический модуль</h3>
            <p style={{ marginBottom: '12px' }}>
              Разработанный на <strong>Python</strong> программный модуль обеспечивает:
            </p>
            <ul style={{ marginBottom: '0px', paddingLeft: '20px'}}>
              <li style={{ marginBottom: '6px' }}><strong>Морфологический анализ</strong> - полный грамматический разбор слов</li>
              <li style={{ marginBottom: '6px' }}><strong>Синтаксический анализ</strong> - определение связей между словами</li>
              <li style={{ marginBottom: '6px' }}><strong>Семантический анализ</strong> - выявление смысловых отношений</li>
              <li style={{ marginBottom: '6px' }}><strong>Графематический анализ</strong> - разбиение текста на токены</li>
              <li style={{ marginBottom: '0px' }}><strong>Сплитер</strong> - разделение текста на слова, предложения и клаузы</li>
            </ul>
          </div>
        </div>

        <h2 style={{ ...global_styles.errorTitle, marginBottom: '16px' }}>API системы</h2>
        <div style={{...global_styles.grayBlok, marginTop:"0px"}}>
          
            <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '8px', marginTop:"0px" }}>
            Пример работы с API грамматического анализа</h3>

            <div style={{ ...global_styles.blueBlok}}>
                <pre>{`POST /api/GraphematicAnalyze
    Content-Type: application/json

    {
    "text": "Мама мыла раму"
    }

    {
    "graph_res": [
        [
        "Мама",
        "RLE Aa BEG NAM?"
        ],
        [
        "␣",
        "DEL SPC"
        ],
        [
        "мыла",
        "RLE aa"
        ],
        [
        "␣",
        "DEL SPC"
        ],
        [
        "раму",
        "RLE aa"
        ],
        [
        ".",
        "PUN SENT_END"
        ]
    ],

    "message": "Сервер получил: \"Мама мыла раму.\" (длина: 15 символов)"
    }`
                    }
                </pre>
            </div>


            <p style={{ marginBottom: '16px', marginTop:"0px" }}>
                Программный модуль предоставляет API для интеграции с другими системами
            </p>

            
            <p style={{marginBottom:"16px"}}>
                Доступные методы API: морфологический, синтаксический, семантический анализы, 
                графематический разбор и сплитинг текста.
            </p>

            <p style={{ marginBottom: '0px', marginTop:"0px" }}>
                Подробности о возможностях, предоставляемых API, можно найти в 
                <a 
                style=
                    {{ 
                        color: '#4299e1',
                        textDecoration: 'none',
                    }}
                href='https://docs.google.com/document/d/1xz1ULAvMqsLML0YoSs78SRbM_g3HA7gIb2VKl_HRBUM/edit?usp=sharing'
                > нашей документации.
                </a>
            </p>

        </div>

        <h2 style={{ ...global_styles.errorTitle, marginBottom: '16px'}}>Возможности системы</h2>
        <div style={{...global_styles.grayBlok, marginTop:"0px", marginBottom: '0px'}}>
          
          <ul style={{ paddingLeft: '20px', marginTop:"0px",marginBottom: '0px' }}>
            <li style={{ marginBottom: '8px' }}>Анализ текстов длиной до 5000 символов</li>
            <li style={{ marginBottom: '8px' }}>Поддержка различных форматов вывода (JSON, XML)</li>
            <li style={{ marginBottom: '8px' }}>Визуализация синтаксических деревьев</li>
            <li style={{ marginBottom: '8px' }}>Определение семантических ролей в предложении</li>
            <li style={{ marginBottom: '0px' }}>Разделение текста на синтаксические клаузы</li>
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
              backgroundColor: '#38a169',
            //   '&:hover': {
            //     backgroundColor: '#2f855a',
            //   } as React.CSSProperties
            }}
            onClick={() => navigate('/demo')}
          >
            Попробовать демо
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;