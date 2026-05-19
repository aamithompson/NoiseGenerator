import './App.css'
import Header from './components/Header'
import AuditoryPage from './pages/auditory/AuditoryPage';
import { ServerStatusProvider } from './context/ServerStatusContext';
function App() {
  return (
    <ServerStatusProvider>
      <Header/>
      <main>
        <AuditoryPage/>
      </main>
    </ServerStatusProvider>
  );
}

export default App