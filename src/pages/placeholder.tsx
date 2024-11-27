import React, { useEffect, useState } from 'react';

const PlaceholderPage = () => {
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken'); // ローカルストレージからトークンを取得
      console.log('Token:', token);
      try {
        const response = await fetch(`${API_URL}/api/v1/placeholders`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 認証トークンをヘッダーに追加
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data.message);
        console.log('Fetched data:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div>
      <h1>仮のページ</h1>
      <p>{message}</p>
    </div>
  );
};

export default PlaceholderPage;
