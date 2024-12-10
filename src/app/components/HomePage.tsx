import React from 'react';
import Link from 'next/link'; // 修正
import '../../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-background">
      <div className="home-container">
        <h1 className="home-title font-KaiseiOpti">ようこそ Nightmare Appへ</h1>
        <p className="home-description">悪夢を改変し、すっきりした気分になりましょう！</p>
        <div className="home-buttons">
          <Link href="/login">
            <a className="login-btn">ログイン</a>
          </Link>
          <Link href="/signup">
            <a className="signup-btn">新規登録</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
