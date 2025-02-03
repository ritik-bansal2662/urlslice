import AboutPage from './components/AboutPage'
import LandingPage from './components/LandingPage'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { Toaster } from 'react-hot-toast'
import LoginPage from './components/LoginPage'
import DashboardLayout from './components/Dashboard/DashboardLayout'
import ShortenUrlPage from "./components/ShortenUrlPage"
import PrivateRoute from './PrivateRoute'
import ErrorPage from './components/ErrorPage'
import CreateShortUrlPage from './components/CreateShortUrlPage'
import Test from './components/Dashboard/Test'

const AppRouter = () => {
    return (
        <>
          <Navbar />
          <Toaster position='bottom-center' />
          <Routes>
            <Route path='' element={<LandingPage /> } />
            <Route path='/about' element={<AboutPage /> } />
            <Route path='/register' element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute> } />
            <Route path='/login' element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute> } />
            <Route path='/dashboard' element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute> } />
            <Route path='/shortenUrl' element={<CreateShortUrlPage /> } />
            <Route path='/error' element={<ErrorPage message="ERROR." /> } />
            <Route path='/test' element={<Test /> } />
            <Route path='*' element={<ErrorPage message="We can't seem to find the page you are looking for." /> } />
          </Routes>
          <Footer />
        </>
    )
}

export default AppRouter

export const SubDomainRouter = () => {
    return (
        <>
          <Routes>
            <Route path='/:url' element={<ShortenUrlPage /> } />
          </Routes>
        </>
    )
}