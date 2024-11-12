import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthProvider from './context/AuthContext'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
