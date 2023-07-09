import {Route, Routes} from 'react-router-dom';
import Nav from './components/nav/Nav'
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
