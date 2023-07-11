import { Route, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ui/theme-provider';
import { useSelector } from 'react-redux';
import Favor from './pages/Favor';

function App() {
  const bg = useSelector((state: { background: { bgImage: string } }) => state.background.bgImage);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
  };

  return (
    <div 
      style={backgroundStyle}
      className="w-full min-h-screen overflow-hidden"
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favor" element={<Favor />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

export default App;
