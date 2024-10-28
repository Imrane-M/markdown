import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link>
        <br />
        <Link to="/editor">Editor</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/editor" element={<Editor />}/>
      </Routes>
    </Router>
  );
}

export default App;
