import React from 'react';
import { useRecipeModal } from '@/stores/useModalStore';

interface RecipeModalProps {
  videoUrl: string;
  isOpen: boolean;
}

export default function RecipeModal({ videoUrl, isOpen }: RecipeModalProps) {
  const embedUrl = getEmbedUrl(videoUrl);
  const { closeModal: closeModal } = useRecipeModal();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-10"
      onClick={handleClose}
    >
      <div className="relative flex h-700 w-800 flex-col gap-20 rounded-24 border-2 border-yellow-200 bg-yellow-50 p-24 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-1/2 w-full flex-col gap-20 rounded-20 bg-gray-50 p-18">
          <p>레시피</p>
          <div></div>
        </div>
        <div className="flex h-1/5 w-full flex-col gap-20 rounded-20 bg-gray-50 p-18">
          <p>필요한 재료</p>
          <div></div>
        </div>
        <div className="flex h-1/4 w-full flex-col gap-20 rounded-20 bg-gray-50 p-18">
          <p>유튜브 레시피 영상</p>
          <div>{embedUrl}</div>
        </div>
      </div>
    </div>
  );
}

function getEmbedUrl(youtubeUrl: string) {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const match = youtubeUrl.match(regex);
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : '';
}
