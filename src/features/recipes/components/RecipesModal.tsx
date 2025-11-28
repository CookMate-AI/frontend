import Image from 'next/image';
import { useState } from 'react';

import ToastContainer from '@/components/feedback/Toast/ToastContainer';
import Button from '@/components/ui/Button';
import { useToastStore } from '@/stores/ui/useToastStore';

import { deleteRecipe, postSave } from '../api/recipesApi';
import type { RecipeData, RecipeSaveData } from '../types/recipeType';
import { RecipeViewer } from './RecipesViewer';

type RecipeModalMode = 'search' | 'mypage';

interface RecipeModalProps {
  recipeData: RecipeData | null;
  videoUrl: string;
  isOpen: boolean;
  foodName: string;
  setRecipeData: (data: RecipeData | null) => void;
  closeModal: () => void;
  mode: RecipeModalMode;
  recipeId?: number;
  onDeleteSuccess?: () => void;
}

export function RecipeModal({
  recipeData,
  videoUrl,
  isOpen,
  foodName,
  setRecipeData,
  closeModal,
  mode,
  recipeId,
  onDeleteSuccess,
}: RecipeModalProps) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { showToast } = useToastStore();

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipeData(null);
    closeModal();
  };

  const handleSaveRecipe = async () => {
    try {
      if (recipeData?.recipe && recipeData?.category !== undefined && recipeData?.isSaved === 'X') {
        const saveData: RecipeSaveData = {
          food: foodName,
          content: recipeData.recipe,
          category: recipeData.category,
        };

        await postSave(saveData);
        setSaveSuccess(true);
        showToast('저장이 완료되었습니다.');
      }
    } catch (error) {
      console.error('레시피 저장 중 에러 발생:', error);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      if (recipeId) {
        await deleteRecipe(recipeId);
        closeModal();

        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      }
    } catch (error) {
      console.error('레시피 삭제 중 에러 발생:', error);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-10"
      onClick={handleClose}
    >
      <div
        className="z-30 flex h-750 w-500 flex-col gap-20 rounded-24 border-2 border-yellow-200 bg-yellow-50 p-24 shadow-lg lg:h-900 lg:w-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col gap-20 overflow-y-auto rounded-20 bg-gray-50 p-18 scrollbar-hide">
          {recipeData ? (
            <RecipeViewer recipe={recipeData.recipe} />
          ) : (
            <p>레시피 데이터를 불러오는 중입니다...</p>
          )}
        </div>

        <div className="flex w-full flex-col justify-center gap-20 rounded-20 bg-gray-50 p-18">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-8 text-14 lg:text-16"
          >
            <Image src="/icons/Youtube_logo.png" alt="youtube logo" width={40} height={40} />
            {foodName} 레시피 확인하기
          </a>
        </div>

        <div className="flex justify-end gap-10">
          {mode === 'mypage' ? (
            <Button
              variant={saveSuccess ? 'outlineDisabled' : 'outlinePrimary'}
              type="button"
              label="삭제하기"
              className="h-50 border-2 font-bold"
              onClick={handleDeleteRecipe}
            />
          ) : (
            <Button
              variant={saveSuccess ? 'outlineDisabled' : 'outlinePrimary'}
              type="button"
              label={saveSuccess ? '저장 완료' : '저장하기'}
              className="h-40 border-2 text-14 font-bold lg:h-50 lg:text-16"
              onClick={handleSaveRecipe}
            />
          )}

          <Button
            variant="outlineSecondary"
            type="button"
            label="닫기"
            className="h-40 border-2 text-14 font-bold lg:h-50 lg:text-16"
            onClick={closeModal}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
