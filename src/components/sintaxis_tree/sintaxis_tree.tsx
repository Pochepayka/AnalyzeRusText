// SintaxisTree.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

import Heading from '../heading/heading.tsx';
import GraphVisualizer from '../visual_graph/visual_graph.tsx';

import { global_styles } from '../main_form/main_form.tsx';

const SintaxisTree = () => {
  const { state } = useLocation();

  if (!state || !state?.data?.graphData) {
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

 
  const NData =
  {
    "edges": [
      {
        "color": "#000000",
        "from": "131539667869344",
        "label": "sentence",
        "to": "131539667869296"
      },
      {
        "color": "#000000",
        "from": "131539667869296",
        "label": "indep+dep",
        "to": "131539667867952"
      },
      {
        "color": "#000000",
        "from": "131539667869296",
        "label": "indep+dep",
        "to": "131539667866560"
      },
      {
        "color": "#000000",
        "from": "131539667869296",
        "label": "indep+dep",
        "to": "131539667866608"
      },
      {
        "color": "#000000",
        "from": "131539667869296",
        "label": "indep+dep",
        "to": "131539667867808"
      },
      {
        "color": "#000000",
        "from": "131539667867952",
        "label": "part",
        "to": "131539667869536"
      },
      {
        "color": "#2E74B5",
        "from": "131539667869536",
        "label": "subject",
        "to": "131539667869488"
      },
      {
        "color": "#808080",
        "from": "131539667869536",
        "label": "genitive",
        "to": "131539667869584"
      },
      {
        "color": "#000000",
        "from": "131539667866560",
        "label": "part",
        "to": "131539667869680"
      },
      {
        "color": "#000000",
        "from": "131539667869680",
        "label": "nominal_pred",
        "to": "131539667869632"
      },
      {
        "color": "#000000",
        "from": "131539667866608",
        "label": "part",
        "to": "131539667869776"
      },
      {
        "color": "#000000",
        "from": "131539667869776",
        "label": "prepositional_object",
        "to": "131539667869872"
      },
      {
        "color": "#2E74B5",
        "from": "131539667869776",
        "label": "subject",
        "to": "131539667869728"
      },
      {
        "color": "#8B4513",
        "from": "131539667869872",
        "label": "object",
        "to": "131539667869920"
      },
      {
        "color": "#000000",
        "from": "131539667867808",
        "label": "part",
        "to": "131539667867664"
      },
      {
        "color": "#000000",
        "from": "131539667867664",
        "label": "prepositional_object",
        "to": "131539667867712"
      },
      {
        "color": "#2E74B5",
        "from": "131539667867664",
        "label": "subject",
        "to": "131539667869968"
      },
      {
        "color": "#8B4513",
        "from": "131539667867712",
        "label": "object",
        "to": "131539667867760"
      }
    ],
    "nodes": [
      {
        "color": "#FF000F",
        "id": "131539667869344",
        "label": "",
        "pos": "ROOT"
      },
      {
        "color": "#FFF00F",
        "id": "131539667869296",
        "label": "",
        "pos": "SENT"
      },
      {
        "color": "#BFF00F",
        "id": "131539667867952",
        "label": "",
        "pos": "PART_SENT"
      },
      {
        "color": "#FF6347",
        "id": "131539667869536",
        "label": "мыла",
        "pos": "VERB"
      },
      {
        "color": "#FFD700",
        "id": "131539667869488",
        "label": "Мама",
        "pos": "NOUN"
      },
      {
        "color": "#FFD700",
        "id": "131539667869584",
        "label": "раму",
        "pos": "NOUN"
      },
      {
        "color": "#BFF00F",
        "id": "131539667866560",
        "label": "",
        "pos": "PART_SENT"
      },
      {
        "color": "#FFD700",
        "id": "131539667869680",
        "label": "папа",
        "pos": "NOUN"
      },
      {
        "color": "#FFD700",
        "id": "131539667869632",
        "label": "окно",
        "pos": "NOUN"
      },
      {
        "color": "#BFF00F",
        "id": "131539667866608",
        "label": "",
        "pos": "PART_SENT"
      },
      {
        "color": "#FF6347",
        "id": "131539667869776",
        "label": "гулял",
        "pos": "VERB"
      },
      {
        "color": "#DDA0DD",
        "id": "131539667869872",
        "label": "во",
        "pos": "PREP"
      },
      {
        "color": "#FFD700",
        "id": "131539667869920",
        "label": "дворе",
        "pos": "NOUN"
      },
      {
        "color": "#FFD700",
        "id": "131539667869728",
        "label": "Миша",
        "pos": "NOUN"
      },
      {
        "color": "#BFF00F",
        "id": "131539667867808",
        "label": "",
        "pos": "PART_SENT"
      },
      {
        "color": "#FF6347",
        "id": "131539667867664",
        "label": "спала",
        "pos": "VERB"
      },
      {
        "color": "#DDA0DD",
        "id": "131539667867712",
        "label": "на",
        "pos": "PREP"
      },
      {
        "color": "#FFD700",
        "id": "131539667867760",
        "label": "диване",
        "pos": "NOUN"
      },
      {
        "color": "#FFD700",
        "id": "131539667869968",
        "label": "кошка",
        "pos": "NOUN"
      }
    ]
  };


  const headingText = "Построение синтаксического дерева";

  return (
    <div style={global_styles.container}>
      <div style={global_styles.card}>
        <Heading 
          headingText={headingText}
          timestamp={state?.timestamp} 
          text={state?.text} 
        />

        <GraphVisualizer
          data = {state.data.graphData}
        /> 



      </div>
    </div>
  );
};


export default SintaxisTree;