import Image from 'next/image';
import { RecipeProps } from '@/types/recipe';
import RecipeModal from '../RecipeModal';
import { postRecommend } from '@/lib/api/recipe';
import { useState } from 'react';

export default function Recipe({ foodName, index }: RecipeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<string>('');
  const youtubeUrlForm = `https://www.youtube.com/results?search_query=${foodName}+레시피`;

  const handleClick = async () => {
    try {
      console.log(`Clicking recipe ${index}: ${foodName}`);
      const result = await postRecommend(foodName);
      console.log(`API response for ${foodName}:`, result);
      setData(result.recipe);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`레시피 추천 중 에러 발생 (${foodName}):`, error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setData('');
  };

  return (
    <>
      <div className="relative w-135 cursor-pointer active:animate-press" onClick={handleClick}>
        <Image src={'/icons/ic-recipe.svg'} alt="recipe" width={135} height={175} />
        <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 break-words px-10 text-center text-20 font-bold">
          {foodName}
        </p>
      </div>
      <RecipeModal
        recipeData={data}
        isOpen={isModalOpen}
        videoUrl={youtubeUrlForm}
        foodName={foodName}
        setRecipeData={setData}
        closeModal={closeModal}
      />
    </>
  );
}
