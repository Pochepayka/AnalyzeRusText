import React, { useState, FC } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

interface HeadingProps {
    headingText: string;
    timestamp?: string;
    text?: string;
  }
  
  const Heading: React.FC<HeadingProps> = ({ headingText, timestamp, text })  => {
    return(
    <div style={{marginTop: "0px"}}>
    <header style={{ marginBottom: '20px', }}>
      <h1 style={{ 

        fontSize: '28px',
        color: '#2d3748',
        marginBottom: '8px',
        marginTop: "0px",
        textAlign: 'center' as const,
      }}>
        {headingText}
      </h1>

      {timestamp && (
        <p style={{ fontSize: '16px',
                    color: '#718096',
                    marginBottom: '32px',
                    textAlign: 'center' as const,}}>
          Анализ выполнен: {new Date(timestamp).toLocaleString()}
        </p>
      )}

    </header>

    <div style = {{
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",}}>
        <h3 style = {{marginBottom: "10px"}}>Исходный текст</h3>
        <p>{text}</p>
    </div>

    <h2 style={{marginBottom: "15px"}}>Результаты анализа</h2>

    </div>
)

}


export default Heading;