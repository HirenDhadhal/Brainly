import { useRef } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    console.log(usernameRef.current?.value);

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });
    navigate('/signin');
  }

  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white min-w-48 rounded-xl'>
        <Input reference={usernameRef} placeholder={'Username'} />
        <Input reference={passwordRef} placeholder={'Password'} />

        <div className='flex justify-center pt-4'>
          <Button
            onClick={signup}
            variant='primary'
            text='Sign Up'
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
