import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout/Default/Layout';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='contact' element={<Contact />} >
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
