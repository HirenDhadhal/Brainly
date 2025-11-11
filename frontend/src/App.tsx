import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import Chat_LLM from './components/Chat_LLM';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/chat' element={<Chat_LLM />} />
        {/* TODO */}
        {/* <Route path='/share/:shareId' element={< />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
