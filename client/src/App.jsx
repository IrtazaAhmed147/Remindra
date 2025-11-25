import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Otp from './pages/otp/Otp.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import SingleCourse from './pages/courses/SingleCourse.jsx';
import Setting from './pages/settings/Setting.jsx';
import CoursePage from './pages/courses/CoursePage.jsx';
import AddCoursePage from './pages/courses/AddCoursePage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import Notification from './pages/Notification.jsx/Notification.jsx';
import FriendsPage from './pages/friends/FriendsPage.jsx';
import AddAssignmentPage from './pages/tasks/AddAssignmentPage.jsx';
import AddQuizPage from './pages/tasks/AddQuizPage.jsx';
import TaskPage from './pages/tasks/TaskPage.jsx';
import UpdateProfilePage from './pages/profile/UpdateProfilePage.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import PrivacyPolicyPage from './pages/policy and conditions/PrivacyPolicyPage.jsx';
import TermsConditionPage from './pages/policy and conditions/TermsConditionPage.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
          <Route index element={<LandingPage />} /> 
          <Route path='/privacypolicy' element={<PrivacyPolicyPage />} /> 
          <Route path='/termsandcondition' element={<TermsConditionPage />} /> 

        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path='/update/profile/:username' element={<UpdateProfilePage />} />
          <Route path='/courses' element={<CoursePage />} />
          <Route path='/add/course' element={<AddCoursePage />} />
          <Route path='/course/:courseId' element={<SingleCourse />} />
          <Route path='/task/:aId' element={<TaskPage />} />
          <Route path='/create/assignment' element={<AddAssignmentPage />} />
          <Route path='/create/quiz' element={<AddQuizPage />} />
          <Route path='/friends/:friendId' element={<FriendsPage />} />
          <Route path='/notification/:userId' element={<Notification />} />
          <Route path='/setting' element={<Setting />} />
        </Route>






        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
