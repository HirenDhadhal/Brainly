import { useState } from 'react';
import './App.css';
import MainContent from './components/MainContent';
import SideBar from './components/SideBar';

function App() {
  const [SidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <div className='flex'>
      <SideBar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent />
    </div>
  );
}

export default App;
