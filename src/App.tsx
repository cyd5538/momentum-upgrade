import {Route, Routes} from 'react-router-dom';
import Nav from './components/nav/Nav'
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ui/theme-provider';

function App() {

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
