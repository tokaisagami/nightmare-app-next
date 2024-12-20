"use client";

import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-900">404</h1>
      <p className="text-lg text-gray-700 mb-8">ページが見つかりません</p>
      <Link href="/">
        <a className="text-blue-600 hover:underline">ホームに戻る</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
