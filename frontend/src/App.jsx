import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlantAnalysis from './pages/PlantAnalysis';
import Result from './pages/Result';
import ModelTest from './pages/ModelTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<PlantAnalysis />} />
        <Route path="/result" element={<Result />} />
        <Route path="/test" element={<ModelTest />} />
      </Routes>
    </Router>
  );
}

export default App;

