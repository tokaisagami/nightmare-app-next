"use client";
import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinner-overlay';

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // 3秒後にローディングを終了
    }, 3000);
    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  return (
    loading ? (
      <div className="loading-overlay">
        <DotLoader 
          size={12}
          color="#ec9aff"
          between={3}
        />
      </div>
    ) : null // ローディング完了後に表示するコンテンツがある場合は適宜調整
  );
};

export default Loading;
