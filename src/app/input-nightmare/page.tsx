"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

const InputNightmare: React.FC = () => {
  const [description, setDescription] = useState('');
  const [ending_category, setEnding_category] = useState('0');
  const [loading, setLoading] = useState(false); // ローディング状態を管理するStateを追加
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ローディング開始
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/nightmares/modify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ description, ending_category: ending_category }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      setLoading(false); // ローディング終了
      return;
    }

    const data = await response.json();
    console.log(data);

    setLoading(false); // ローディング終了

    // 改変結果を表示する画面に遷移する処理を追加
    navigate.push({
      pathname: '/modified-nightmare',
      query: {
        modified_description: data.modified_description,
        description: description,
        ending_category: ending_category
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      {loading && <Loading />} {/* ローディング状態に応じてローディングアニメーションを表示 */}
      <form
        className="bg-pink-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border-solid border-2 border-pink-300"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 font-KaiseiOpti">悪夢を入力してください</h1>
        <div className="mb-4">
          <label className="block mb-2 font-KaiseiOpti">悪夢内容：</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 shadow-lg rounded border-solid border-2 border-pink-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-KaiseiOpti">結末：</label>
          <div>
            <label className="font-KaiseiOpti">
              <input
                type="radio"
                value="0"
                checked={ending_category === '0'}
                onChange={(e) => setEnding_category(e.target.value)}
              />
              ハッピーエンド
            </label>
            <label className="ml-4 font-KaiseiOpti">
              <input
                type="radio"
                value="1"
                checked={ending_category === '1'}
                onChange={(e) => setEnding_category(e.target.value)}
              />
              予想外の結末
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-KosugiMaru">
          改変する
        </button>
      </form>
    </div>
  );
};

export default InputNightmare;
