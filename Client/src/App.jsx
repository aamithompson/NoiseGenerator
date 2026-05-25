import './App.css'
import Header from './components/Header'
import AuditoryPage from './pages/auditory/AuditoryPage';
import PerlinPage from './pages/perlin/PerlinPage';
import { ServerStatusProvider } from './context/ServerStatusContext';
import { useEffect, useRef} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const headerRef = useRef(null);

  const DEFAULT_PAGE = "/auditory";

  useEffect(() => {
    console.log(headerRef.current);
    if(headerRef.current == null) {
      return;
    }

    const header = headerRef.current;
    const observer = new ResizeObserver(() => {
        document.documentElement.style.setProperty(
            '--header-height', `${header.offsetHeight}px`
        );
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, [headerRef.current]);

  return (
    <ServerStatusProvider>
      <div className='app'>
        <Header ref={headerRef}/>
        <main>
            <Routes>
            {/* Default Path - Redirects "/" path to DEFAULT_PAGE */}
            <Route path="/" element={<Navigate to={DEFAULT_PAGE} replace/>}/>

            {/* Pages */}
            <Route path="/auditory" element={<AuditoryPage/>}/>
            <Route path="/perlin" element={<PerlinPage/>}/>

          </Routes>
        </main>
      </div>
    </ServerStatusProvider>
  );
}

export default App