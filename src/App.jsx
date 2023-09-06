/* import logo from './logo.svg'; */
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import UserName from './pages/UserName';
import NotFound from './pages/NotFound';
import HowToPlay from './pages/HowToPlay';
import Game from './pages/Game';
import Help from './components/Help';

function App() {
  return (
    <div className="App">
      <Help />
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/username/:act" element={<UserName/>}/>
          <Route path="/howtoplay" element={<HowToPlay/>}/>
          <Route path="/game" element={<Game/>}/>
          <Route path ="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
