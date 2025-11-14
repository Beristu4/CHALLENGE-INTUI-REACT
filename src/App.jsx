import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CardClient from './Componentes/CardClient'
import ClientForm from './Componentes/ClientForm';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardClient />}/>
        <Route path="/client/edit/:id" element={<ClientForm />}/>
        <Route path="/client/new" element={<ClientForm />}/>
      </Routes>
    </Router>
  )
}

export default App
