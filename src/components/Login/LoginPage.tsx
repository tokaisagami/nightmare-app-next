import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const location = useLocation();
  const state = location.state as { email: string; password: string; message: string; messageType: 'success' | 'error' } | undefined;

  const [email, setEmail] = useState(state?.email || ''); // 初期状態を遷移時の状態に設定
  const [password, setPassword] = useState(state?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(state?.message || null);
  const [messageType, setMessageType] = useState(state?.messageType || null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token); // トークンをローカルストレージに保存
        const user = { id: data.user_id, name: data.user_name, email: data.user_email }; // idを追加
        console.log(user);
        dispatch(login(user));  // ユーザー情報を渡してログイン状態を更新
        navigate('/mainPage'); // 仮のトップページに遷移
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

  // const handleGuestLogin = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/guest_login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log('Guest login successful:', data);
  //       dispatch(login());  // ログイン状態を更新
  //     } else {
  //       console.error('Guest login failed:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center font-KaiseiOpti">ログイン</h1>
        {message && (  // メッセージ表示部分を追加
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
            {/* <button type="button" onClick={handleGuestLogin} className="w-2/4 bg-amber-200 hover:bg-yellow-400 text-gray-600 font-bold py-2 px-4 rounded">
              ゲストログイン
            </button> */}
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-KosugiMaru">新規登録へ</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
