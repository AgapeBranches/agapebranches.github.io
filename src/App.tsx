import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Portal from './pages/Portal';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
