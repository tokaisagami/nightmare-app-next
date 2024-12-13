"use client";

import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../store/slices/registerSlice';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { ZxcvbnResult } from '@zxcvbn-ts/core/src/types'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnJaPackage from '@zxcvbn-ts/language-ja'

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<ZxcvbnResult | undefined>(undefined)
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        dispatch(register());
        navigate.push(`/login?email=${encodeURIComponent(email)}&
                              password=${encodeURIComponent(password)}&
                              message=${encodeURIComponent('ユーザー登録が成功しました！')}&
                              messageType=success`
        );
      } else {
        console.error('Signup failed:', data);
        setMessage('ユーザー登録に失敗しました。もう一度お試しください。');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('サーバーエラーが発生しました。管理者に問い合わせてください。');
      setMessageType('error');
    }
  };

  // zxcvbnの設定
  const options = {
    translations: zxcvbnJaPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnJaPackage.dictionary,
    },
  }
  zxcvbnOptions.setOptions(options)

  useEffect(() => {
    if (!password) {
      setResult(undefined);
      return;
    }
    const newResult = zxcvbn(password);
    setResult(newResult);
  }, [password]);

  const getBarColor = (v: number, score: number) => {
    if (v <= score) {
      switch (score) {
        case 0:
          return 'bg-red-500';
        case 1:
          return 'bg-orange-500';
        case 2:
          return 'bg-yellow-500';
        case 3:
          return 'bg-green-500';
        case 4:
          return 'bg-blue-500';
        default:
          return 'bg-gray-500';
      }
    }
    return 'bg-gray-300';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center font-KaiseiOpti">新規ユーザー登録</h1>
        {message && (
          <div className={`p-4 mb-4 text-sm rounded ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-KaiseiOpti">名前:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-KaiseiOpti">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              autoComplete="Email"
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
                autoComplete="new-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className="mt-[20px]">
              <div className="flex w-full gap-[1%]">
                {[0, 1, 2, 3, 4].map((v) => (
                  <div
                    className={`h-[4px] w-[24%] ${result ? getBarColor(v, result.score) : 'bg-gray-300'}`}
                    key={v}
                  />
                ))}
              </div>
              {result && result.score + 1}
            </div>
            {result?.feedback && <div className="text-[#f00]">{result.feedback.warning}</div>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2 font-KaiseiOpti">パスワード（確認）:</label>
            <div className="relative">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
                autoComplete="new-password"
              />
              <span
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
              >
                <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <button type="submit" className="w-2/4 bg-blue-500 hover:bg-blue-700 font-KosugiMaru text-white font-bold py-2 px-4 rounded">
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
