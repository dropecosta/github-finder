import axios from 'axios';
import { SetStateAction, useCallback, useEffect, useState, useRef } from 'react';
import Input from '@/components/Input';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image'

interface AuthProps {
  email: string;
  name: string;
  password: string;
  variant: 'login' | 'register';
  setEmail: React.Dispatch<SetStateAction<string>>;
  setName: React.Dispatch<SetStateAction<string>>;
  setPassword: React.Dispatch<SetStateAction<string>>;
  toggleVariant: () => void;
  login: () => Promise<void>;
  register: () => Promise<void>;
}

const useAuth = (): AuthProps => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState<'login' | 'register'>('login');
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = useCallback(async () => {

    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {

    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });

      login();

    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return {
    email,
    name,
    password,
    variant,
    setEmail,
    setName,
    setPassword,
    toggleVariant,
    login,
    register,
  };
};

const Auth = (): JSX.Element => {
  const {
    email,
    name,
    password,
    variant,
    setEmail,
    setName,
    setPassword,
    toggleVariant,
    login,
    register,
  } = useAuth();
  

  return (
    <div className="relative h-full w-full bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="./images/logo.svg"
            className="h-10 ml-5 mt-5"
            width={100}
            height={30}
            alt="Logo"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'Don’t have an account?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Click here to sign up' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
