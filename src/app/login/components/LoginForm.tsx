"use client";

import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const state = router.query as { email?: string; password?: string; message?: string; messageType?: 'success' | 'error' };

  const [email, setEmail] = useState(state?.email || '');
  const [password, setPassword] = useState(state?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(state?.message || null);
  const [messageType, setMessageType] = useState(state?.messageType || null);

  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);
        const user = { id: data.user_id, name: data.user_name, email: data.user_email };
        console.log(user);
        dispatch(login(user));
        router.push('/mainPage');
      } else {
        console.error('Login failed:', data);
        setMessage('ログインに失敗しました。メールアドレスまたはパスワードが間違っています。');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('ログイン中にエラーが発生しました。もう一度お試しください。');
      setMessageType('error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center font-KaiseiOpti">ログイン</h1>
        {message && (
          <div className={`p-4 mb-4 text-sm rounded ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-KaiseiOpti">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              autoComplete="username"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2 font-KaiseiOpti">パスワード:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                autoComplete="current-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <button
              type="submit"
              className="w-2/4 bg-green-300 hover:bg-emerald-500 font-KosugiMaru text-gray-600 hover:text-white font-bold py-2 px-4 rounded">
              ログイン
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link href="/signup">
            <a className="text-blue-500 hover:text-blue-700 font-KosugiMaru">新規登録へ</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
