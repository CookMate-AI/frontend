import React from 'react';
import RecipeViewer from './RecipeViewer';
import Image from 'next/image';

interface RecipeModalProps {
  recipeData: string;
  videoUrl: string;
  isOpen: boolean;
  foodName: string;
  setRecipeData: (data: string) => void;
  closeModal: () => void;
}

export default function RecipeModal({
  recipeData,
  isOpen,
  videoUrl,
  foodName,
  setRecipeData,
  closeModal,
}: RecipeModalProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipeData('');
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-10 z-20"
      onClick={handleClose}
    >
      <div
        className="relative flex h-700 w-800 flex-col gap-20 rounded-24 border-2 border-yellow-200 bg-yellow-50 p-24 shadow-lg z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-5/6 w-full flex-col gap-20 rounded-20 bg-gray-50 p-18">
          <RecipeViewer recipe={recipeData} />
        </div>
        <div className="flex h-1/6 w-full flex-col justify-center gap-20 rounded-20 bg-gray-50 p-18">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-8"
          >
            <Image src={'/icons/Youtube_logo.png'} alt="youtube logo" width={40} height={40} />
            {foodName} 레시피 확인하기
          </a>
        </div>
      </div>
    </div>
  );
}
