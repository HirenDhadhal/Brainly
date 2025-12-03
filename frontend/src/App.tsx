import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import Landing  from './pages/LandingPage';
import { AnotherUserBrain} from './pages/ViewOtherUsersBrain';
import Chat_LLM from './components/Chat_LLM';
import { useStateStore } from './store/stateStore';
import { ProtectedRoute } from './pages/ProtectedRoute';

function App() {
  const currentUser = useStateStore((state) => state.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to={'/dashboard'} replace/> : <Landing/>} />
          <Route path='/signin' element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/chat' element={<Chat_LLM />} />
          <Route path='/brain/:shareId' element={< AnotherUserBrain/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
