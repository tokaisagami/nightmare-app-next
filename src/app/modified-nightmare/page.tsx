"use client";
import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaSquareXTwitter } from "react-icons/fa6";

const DisplayNightmare: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const description = searchParams.get('description') ?? '';
  const modified_description = searchParams.get('modified_description') ?? '';
  const ending_category = searchParams.get('ending_category') ?? '0';
  
  const [showModal, setShowModal] = useState(false);
  const [nightmareId, setNightmareId] = useState<number | null>(null);
  const [tweetUrl, setTweetUrl] = useState<string>('');

  useEffect(() => {
    if (nightmareId !== null) {
      setTweetUrl(`https://twitter.com/intent/tweet?text=改変された悪夢を共有します！&url=${process.env.NEXT_PUBLIC_API_URL}/nightmares/${nightmareId}`);
    }
  }, [nightmareId]);

  const handlePost = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/nightmares`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        description: description,
        modified_description: modified_description,
        ending_category: parseInt(ending_category, 10),
        published: true
      })
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();
    setNightmareId(data.id);
    setShowModal(true);
  };

  return (
    <HelmetProvider>
      <div className="flex flex-col justify-center items-center mt-8">
        {nightmareId && (
          <Helmet>
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/images/nightmare-app_OGP.png`} />
            <meta property="og:description" content="AIで悪夢を改変し、すっきりした気分になりましょう！" />
            <meta property="og:title" content="Nightmare App" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_API_URL}/nightmares/${nightmareId}`} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Nightmare App" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Nightmare App" />
            <meta name="twitter:description" content="AIで悪夢を改変し、すっきりした気分になりましょう！" />
          </Helmet>
        )}
        <div className="bg-green-50 shadow-lg p-6 rounded-lg w-[95%] mx-auto border-solid border-2 border-green-300">
          <h1 className="text-2xl font-bold mb-4 font-KaiseiOpti">改変された悪夢内容</h1>
          <div className="bg-green-100 shadow-lg border-solid rounded-lg p-6 border-2 border-green-300">
            <p className="whitespace-pre-wrap text-base">{modified_description}</p>
          </div>
          <button onClick={handlePost} className="bg-blue-500 text-white font-KosugiMaru px-4 py-2 rounded mt-4">
            投稿する
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p>悪夢内容を投稿しました！</p>
              <div className="flex justify-around mt-4 space-x-4">
                <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white font-KosugiMaru px-4 py-2 rounded flex">
                  閉じる
                </button>
                <a
                  href={tweetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white font-KosugiMaru px-4 py-2 rounded flex items-center"
                >
                  <FaSquareXTwitter className="mr-2 text-xl sm:text-2xl md:text-3xl" />
                  共有する
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link href="/mainPage">
            <a className="text-blue-500 hover:text-blue-700 font-KosugiMaru">メインページへ</a>
          </Link>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default DisplayNightmare;
