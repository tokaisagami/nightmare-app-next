import React from 'react';
import Image from 'next/image'; // 追加

interface PostCardProps {
  description: string;
  modified_description: string;
  author: string;
  ending_category: string; // 文字列型に変更
  created_at: string; // 文字列型に変更
}

const PostCard: React.FC<PostCardProps> = ({ description, modified_description, author, ending_category, created_at }) => {
  // サムネイル画像の決定
  const endingImage = {
    happy_end: '/images/nightmare-card/HAPPY-END.png',
    unexpected_end: '/images/nightmare-card/unexpected-end.png'
  }[ending_category];

  // ending_categoryに基づく表示内容を決定
  const endingText = {
    happy_end: 'ハッピーエンド',
    unexpected_end: '予想外の結末',
    bad_end: 'バッドエンド'
  }[ending_category] || '不明';

  // ending_categoryに基づく色の決定
  const endingColor = {
    happy_end: 'text-green-500',
    unexpected_end: 'text-pink-500'
  }[ending_category] || 'text-gray-500';

  // 作成日時のフォーマット
  const date = new Date(created_at);
  const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="post-card p-4 mb-4 rounded-xl shadow-lg bg-white h-full border-solid border-4 border-gray-300">
      {endingImage && <Image src={endingImage} alt="サムネイル" className="mx-auto mb-4" />}
      <h3 className="text-lg md:text-lg lg:text-lg font-semibold text-center mb-4 font-KaiseiOpti">{author}さんの悪夢</h3>
      <p className="text-sm text-gray-700 mb-4 font-KaiseiOpti">
        <span className={`inline-block ${endingColor}`}>■</span> {endingText}
      </p>
      <p className="text-xs text-gray-600 mb-4 font-KaiseiOpti">投稿: {formattedDate}</p>
    </div>
  );
};

export default PostCard;
