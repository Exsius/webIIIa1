import './global.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import ThemeProvider from './Context/Theme'
import UserProvider from './Context/User'
import { Header } from './Components'
import Dashboard from './Pages/Dashboard'
import Search from './Pages/Search'

const App = () => (
  <ThemeProvider>
    <UserProvider>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/' element={ <Search /> } />
            <Route path='/movies' element={ <Dashboard /> } />
            <Route path='/movie/:id' element={ <Dashboard /> } />
            <Route path='*' element={ <Navigate to='/' />  } />
          </Routes>
        </Header>
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>
)

export default App
