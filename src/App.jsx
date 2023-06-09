import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/username" element={<UserName/>}/>
          <Route path="/howtoplay" element={<HowToPlay/>}/>
          <Route path ="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
