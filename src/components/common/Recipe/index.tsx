import Image from 'next/image';
import { RecipeProps } from '@/types/recipe';
import RecipeModal from '../RecipeModal';
import { postRecommend } from '@/lib/api/recipe';
import { useState } from 'react';
import { RecipeData } from '@/types/recipe';
import Loading from '../Loading';

export default function Recipe({ foodName, recipeId, onDeleteSuccess }: RecipeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<RecipeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const youtubeUrlForm = `https://www.youtube.com/results?search_query=${foodName}+레시피`;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await postRecommend(foodName);
      setData(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`레시피 추천 중 에러 발생 (${foodName}):`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  return (
    <>
      <div className="relative cursor-pointer active:animate-press" onClick={handleClick}>
        <div className="relative h-140 w-110 lg:h-175 lg:w-135">
          <Image src={'/icons/ic-recipe.svg'} alt="recipe" fill className="object-contain" />
        </div>
        <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 break-words text-center text-14 font-bold lg:text-20">
          {foodName}
        </p>
      </div>
      {isLoading && <Loading />}
      <RecipeModal
        recipeData={data}
        isOpen={isModalOpen}
        videoUrl={youtubeUrlForm}
        foodName={foodName}
        setRecipeData={setData}
        closeModal={closeModal}
        recipeId={recipeId}
        onDeleteSuccess={onDeleteSuccess}
      />
    </>
  );
}
