"use client";

import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from '../../components/Loading';
import Image from 'next/image';

interface Nightmare {
  id: number;
  description: string;
  modified_description: string;
  author: string;
  ending_category: string;
  created_at: string;
}

const MainPage: React.FC = () => {
  const router = useRouter();
  const [nightmares, setNightmares] = useState<Nightmare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // 現在のページに表示する投稿を計算
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNightmares = nightmares.slice(indexOfFirstPost, indexOfLastPost);

  // ページ変更ハンドラー
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchNightmares = async () => {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/nightmares`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch nightmares');
        }
        const data: Nightmare[] = await response.json(); // 型を指定
        setNightmares(data);
        console.log(data);
      } catch (error) {
        if (error instanceof Error) { // 型ガードを追加
          setError(error.message);
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNightmares();
  }, []);
  
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <button
        onClick={() => router.push('/input-nightmare')}
        className="bg-blue-500 text-white text-xl px-6 py-4 rounded-xl mb-4 font-KosugiMaru border-double border-4 border-white"
      >
        悪夢を改変する
      </button>
      <div className="bg-pink-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border border-gray-300">
        <header className="main-header text-center mb-6">
          <div>
            <Image src="/images/Mainpage-title.png" alt="みんなの悪夢" className="mx-auto mb-4" />
          </div>
        </header>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentNightmares.map((nightmare) => (
            <Link key={nightmare.id} href={`/nightmares/${nightmare.id}`}>
              <a>
                <PostCard
                  description={nightmare.description.length > 50 ? nightmare.description.substring(0, 50) + '...' : nightmare.description}
                  modified_description={nightmare.modified_description}
                  author={nightmare.author}
                  ending_category={nightmare.ending_category}
                  created_at={nightmare.created_at}
                />
              </a>
            </Link>
          ))}
        </main>
        <nav className="mt-4">
          <ul className="pagination flex justify-center">
            {Array.from({ length: Math.ceil(nightmares.length / postsPerPage) }, (_, index) => (
              <li key={index} className="page-item mx-1">
                <button onClick={() => paginate(index + 1)} className="page-link border border-gray-300 px-3 py-1 rounded">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
