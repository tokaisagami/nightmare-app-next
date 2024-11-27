import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // CSSファイルをインポート

const HomePage: React.FC = () => {
  return (
    <div className="home-background">
      <div className="home-container">
        <h1 className="home-title font-KaiseiOpti">ようこそ Nightmare Appへ</h1>
        <p className="home-description">悪夢を改変し、すっきりした気分になりましょう！</p>
        <div className="home-buttons">
          <Link to="/login" className="login-btn">ログイン</Link>
          <Link to="/signup" className="signup-btn">新規登録</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
