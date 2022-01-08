import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Basics from "./routes/baiscs";
import Audio from "./routes/audio";
import Password from "./routes/password";
import Terms from "./routes/terms";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function App() {
  return (
    <div className="App p-5">
       <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Navigate to="/basics" />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/password" element={<Password />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
