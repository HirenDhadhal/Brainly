import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import { BACKEND_URL } from '../config';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    console.log(usernameRef.current?.value);

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });

    const jwt_token = response.data.token;
    localStorage.setItem('token', jwt_token);
    navigate('/dashboard');
  }

  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white rounded min-w-48 rounded-xl'>
        <Input reference={usernameRef} placeholder={'Username'} />
        <Input reference={passwordRef} placeholder={'Password'} />

        <div className='flex justify-center pt-4'>
          <Button
            onClick={signin}
            variant='primary'
            text='Sign In'
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
