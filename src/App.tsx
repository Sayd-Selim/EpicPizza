import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Cart from './components/pages/Cart'
import './scss/app.scss'
import React from 'react'

const App:React.FC = () => {

  return (
    <div className='wrapper'>
      <Header/>
      <div className='content'>
        
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/cart.html' element={<Cart />}/>
            <Route path='*' element={<NotFound />} />
          </Routes>
        
      </div>
    </div>
  )
}

export default App
