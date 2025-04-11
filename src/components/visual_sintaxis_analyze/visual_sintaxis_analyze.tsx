import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface Token {
  id: string;
  text: string;
  pos: string;
}

interface SyntaxLink {
  from: string;
  to: string;
  type: string;
}

interface SyntaxVisualizerProps {
  tokens: Token[];
  links: SyntaxLink[];
  // width?: number;
  // height?: number;
}

const SyntaxVisualizer: React.FC<SyntaxVisualizerProps> = ({
  tokens,
  links,
  // width = 700,
  // height = 300,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(700);

  useEffect(() => {
    if (!svgRef.current || tokens.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Конфигурация
    const tokenHeight = 30;
    const tokenWidth = 90;
    const lineHeight = 60; // Увеличили высоту строки
    const maxTokensPerLine = 8;
    const underlineOffset = 25; // Подчеркивание ниже текста
    const connectionOffset = 10;
     
    setHeight(lineHeight * tokens.length/maxTokensPerLine);

    // Разбиваем токены на строки
    const lines: Token[][] = [];
    for (let i = 0; i < tokens.length; i += maxTokensPerLine) {
      lines.push(tokens.slice(i, i + maxTokensPerLine));
    }

    // Стили для подчеркиваний
    const styles: Record<string, { 
      color: string; 
      width: number; 
      dashArray?: string; 
      linesCount?: number;
      wave?: boolean;
    }> = {
      "Инфинитив": { color: 'red', width: 2, linesCount: 2 }, // Две красные линии
      "Номинальное сказуемое": { color: 'red', width: 2, linesCount: 2 }, // Две красные линии
      "Корневое сказуемое": { color: 'red', width: 2, linesCount: 2 }, // Две красные линии
      'Сказуемое': { color: 'red', width: 2, linesCount: 2 }, // Две красные линии
      'Корневое подлежащее': { color: 'blue', width: 2 }, // Одна синяя линия
      "Подлежащее": { color: 'blue', width: 2 }, // Одна синяя линия
      "Дополнение": { color: 'orange', width: 2, dashArray: '5,3' }, // Желтый пунктир
      "Обстоятельство": { color: 'green', width: 2, dashArray: '2,2' }, // Зеленый пунктир с точками
      "Определение": { color: 'purple', width: 2, wave: true }, // Фиолетовая волна
    };

    // Словарь позиций токенов
    const tokenPositions: Record<string, { x: number; y: number }> = {};

    // Рисуем текст
    lines.forEach((line, lineIndex) => {
      line.forEach((token, tokenIndex) => {
        const x = tokenIndex * tokenWidth + tokenWidth / 2;
        const y = lineIndex * lineHeight;

        // Сохраняем позицию токена
        tokenPositions[token.id] = { x, y };

        // Текст токена
        svg.append('text')
          .attr('x', x)
          .attr('y', y + tokenHeight / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .text(token.text);

        // Подчеркивание
        if (token.pos && styles[token.pos]) {
          const style = styles[token.pos];
          const lineSpacing = 3; // Расстояние между линиями

          if (style.wave) {
            // Рисуем волну для определений
            const wavePath = `M${x - tokenWidth / 3},${y + underlineOffset} 
              q${tokenWidth / 12},-5 ${tokenWidth / 6},0 
              t${tokenWidth / 6},0 
              t${tokenWidth / 6},0`;
            svg.append('path')
              .attr('d', wavePath)
              .attr('fill', 'none')
              .attr('stroke', style.color)
              .attr('stroke-width', style.width);
          } else {
            // Рисуем обычные подчеркивания
            const linesCount = style.linesCount || 1;
            for (let i = 0; i < linesCount; i++) {
              const lineY = y + underlineOffset + (i * lineSpacing);
              const line = svg.append('line')
                .attr('x1', x - tokenWidth / 3)
                .attr('x2', x + tokenWidth / 3)
                .attr('y1', lineY)
                .attr('y2', lineY)
                .attr('stroke', style.color)
                .attr('stroke-width', style.width);

              if (style.dashArray) {
                line.attr('stroke-dasharray', style.dashArray);
              }
            }
          }
        }
      });
    });

    // Рисуем связи между токенами (остается без изменений)
    links.forEach((link, i) => {
      const source = tokenPositions[link.from];
      const target = tokenPositions[link.to];

      if (!source || !target) return;

      // Смещение для избежания наложения связей
      const level = i % 3;
      const offset = connectionOffset * (level + 1);

      // Создаем кривую Безье для связи
      const lineGenerator = d3.line<[number, number]>()
        .curve(d3.curveBasis);

      const points: [number, number][] = [
        [source.x, source.y + underlineOffset],
        [source.x, source.y + underlineOffset + offset],
        [target.x, target.y + underlineOffset + offset],
        [target.x, target.y + underlineOffset],
      ];

      // Рисуем линию связи
      svg.append('path')
        .attr('d', lineGenerator(points))
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-width', 1);

      // Рисуем стрелку
      svg.append('path')
        .attr('d', `M${target.x - 5},${target.y + underlineOffset - 5} L${target.x},${target.y + underlineOffset} L${target.x - 5},${target.y + underlineOffset + 5}`)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-width', 1);
    });

  }, [tokens, links, width, height]);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg 
        ref={svgRef} 
        width={width} 
        height={height}
        style={{ display: 'block', margin: '0 auto' }}
      />
    </div>
  );
};

export default SyntaxVisualizer;