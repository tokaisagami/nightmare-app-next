"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import Image from 'next/image'; // 追加

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // トークンをローカルストレージから削除
    dispatch(logout()); // ログイン状態を更新
    router.push('/login'); // ログインページに遷移
  };

  return (
    <header className="bg-title text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <Image src="/images/Title-Logo2.png" alt="Nightmare App" className="h-8 sm:h-10 md:h-12 w-auto" />
      {isLoggedIn ? (
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a className="hover:text-gray-400 text-xs font-KosugiMaru sm:text-xs md:text-base" href="/mypage">マイページ</a>
            </li>
            <li>
              <a className="hover:text-gray-400 text-xs font-KosugiMaru sm:text-xs md:text-base" href="/mainPage">メインページ</a>
            </li>
            <li>
              <button className="hover:text-gray-400 text-xs font-KosugiMaru sm:text-xs md:text-base" onClick={handleLogout}>ログアウト</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a className="hover:text-gray-400 text-xs font-KosugiMaru sm:text-xs md:text-base" href="/login">ログイン</a>
            </li>
            {/* <li><a className="hover:text-gray-400" href="/signup">ゲストログイン</a></li> */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
