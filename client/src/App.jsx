import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterLogin from './pages/RegisterLogin'
import DashBoard from './pages/DashBoard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterLogin />}/>
        <Route path='/dashboard' element={<DashBoard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
