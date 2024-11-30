import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MainpageTitle from '../../assets/Mainpage-title.png';

interface Nightmare {
  id: number;
  description: string;
  modified_description: string;
  author: string;
  ending_category: string;
  created_at: string;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
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
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch nightmares');
        }
        const data = await response.json();
        setNightmares(data);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
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
        onClick={() => navigate('/input-nightmare')}
        className="bg-blue-500 text-white text-xl px-6 py-4 rounded-xl mb-4 font-KosugiMaru border-double border-4 border-white"
      >
        悪夢を改変する
      </button>
      <div className="bg-pink-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border border-gray-300">
        <header className="main-header text-center mb-6">
          <div>
            <img src={MainpageTitle} alt="みんなの悪夢" className="mx-auto mb-4" />
          </div>
        </header>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentNightmares.map((nightmare) => (
            <Link key={nightmare.id} to={`/nightmares/${nightmare.id}`}>
              <PostCard
                description={nightmare.description.length > 50 ? nightmare.description.substring(0, 50) + '...' : nightmare.description}
                modified_description={nightmare.modified_description}
                author={nightmare.author}
                ending_category={nightmare.ending_category}
                created_at={nightmare.created_at}
              />
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
