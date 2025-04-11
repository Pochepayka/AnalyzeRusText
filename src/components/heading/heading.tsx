import React, { useState, FC } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { global_styles } from '../main_form/main_form.tsx';

interface HeadingProps {
    headingText: string;
    timestamp?: string;
    text?: string;
  }
  
  const Heading: React.FC<HeadingProps> = ({ headingText, timestamp, text })  => {
    return(
    <div style={{marginTop: "0px"}}>
    <header style={{ marginBottom: '20px', }}>
      <h1 style={global_styles.title}>
        {headingText}
      </h1>

      {timestamp && (
        <p style={global_styles.subtitle}>
          Анализ выполнен: {new Date(timestamp).toLocaleString()}
        </p>
      )}

    </header>

    <div style = {global_styles.grayBlok}>
        <h3 style = {{marginTop:"0px", marginBottom: "10px"}}>Исходный текст</h3>
        <p style = {{...global_styles.mainText,marginTop:"0px", marginBottom: "0px"}} >{text}</p>
    </div>

    <h2 style={{marginBottom: "15px"}}>Результаты анализа</h2>

    </div>
)

}


export default Heading;