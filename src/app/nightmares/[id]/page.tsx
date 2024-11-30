import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

interface Nightmare {
  id: number;
  description: string;
  modified_description: string;
  author: string;
}

const NightmareDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nightmare, setNightmare] = useState<Nightmare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 認証状態を管理

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // トークンが存在する場合は認証済みとする
    }

    const fetchNightmare = async () => {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/${id}`, {
          headers: headers
        });
        if (!response.ok) {
          throw new Error('Failed to fetch nightmare');
        }
        const data = await response.json();
        setNightmare(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNightmare();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!nightmare) {
    return <div>No nightmare found</div>;
  }

  return (
    <div className="nightmare-detail flex flex-col justify-center items-center mt-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full border-solid border-4 border-indigo-100">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 font-KaiseiOpti">{nightmare.author}さんの悪夢</h1>
        <h3 className="text-lg font-semibold mb-2 font-KaiseiOpti">
          <span className="inline-block text-rose-400">■</span> 悪夢内容：
        </h3>
        <p className="text-gray-700 text-base md:text-base lg:text-base mb-2 break-words">
          {nightmare.description}
        </p>
        <h3 className="text-lg font-semibold mb-2 font-KaiseiOpti">
        <span className="inline-block text-indigo-400">■</span> 改変された結末：
        </h3>
        <p className="text-gray-700 text-base md:text-base lg:text-base mb-2 break-words">
          {nightmare.modified_description}
        </p>
      </div>
      {isAuthenticated ? (
        <Link to="/mainPage" className="block font-KosugiMaru text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
          メインページへ
        </Link>
      ) : (
        <Link to="/" className="block text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
          新規登録へ
        </Link>
      )}
    </div>
  );
};

export default NightmareDetail;
