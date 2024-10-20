import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import TutorSignup from './pages/SignupPage/TutorSingup'
import StudentSignUp from './pages/SignupPage/StudentSignup'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/tutor/signup' element={<TutorSignup />}/>
        <Route path='/student/signup' element={<StudentSignUp />} />
        <Route path='/login' element={<LoginPage role='PUBLIC' />} />
      </Routes>
    </>
  )
}

export default App
