
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from "./components/main_form/main_form.tsx"
import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import Graph from './components/graphem_table/graph_table.tsx';
import Morph from './components/morph_table/morph_table.tsx';
import SintaxisScool from './components/sintaxis_scool/sintaxis_scool.tsx';
import SintaxisTree from './components/sintaxis_tree/sintaxis_tree.tsx';
import Semantic from './components/semantic_table/semantic_table.tsx';
import Spliter from './components/spliter_table/spliter_table.tsx';

function App() {
  const [count, setCount] = useState(0);


  

  return (
    <Router>
      <div className="app">
        <Header/>
        <Routes className = "Main">
          <Route path="/" element={<Home />} />
          <Route path="/analysis/GraphematicAnalyze" element={<Graph />} />
          <Route path="/analysis/MorphAnalyze" element={<Morph />} />
          <Route path="/analysis/SintaxisAnalyze" element={<SintaxisScool />} />
          <Route path="/analysis/BuildSintaxisTree" element={<SintaxisTree />} />
          <Route path="/analysis/SemanticAnalize" element={<Semantic />} />
          <Route path="/analysis/Spliter" element={<Spliter />} />
        </Routes>      
        <Footer/>
      </div>

    </Router>
    
  );//<Route path="/analysis" element={<AnalysisPage />} />
}

export default App;
