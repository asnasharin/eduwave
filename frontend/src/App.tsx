import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import TutorSignup from './pages/SignupPage/TutorSingup'
import StudentSignUp from './pages/SignupPage/StudentSignup'
import LoginPage from './pages/LoginPage/LoginPage'
import CoursePage from './pages/CoursesPage/CoursePage'
import TutorHomePage from './pages/TutorHomePage/TutorHomePage'
import TutorProfileCard from './components/TutorProfileCard/TutorProfileCard'
import StudentRequests from './components/StudentRequest/StudentRequest'
import VideoChat from './components/VideoRoom/VideoRoom'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/tutor/signup' element={<TutorSignup />}/>
        <Route path='/student/signup' element={<StudentSignUp />} />
        <Route path='/login' element={<LoginPage role='PUBLIC' />} />
        <Route path='/courses' element={<CoursePage />} />
        <Route path='/tutor' element={<TutorHomePage />}/>
        <Route path='/tutor/profile' element={<TutorProfileCard />} />
        <Route path='/student/requests'  element={<StudentRequests />}/>
        <Route path="/student/video-chat/:id" element={<VideoChat />} />
      </Routes>
    </>
  )
}

export default App
