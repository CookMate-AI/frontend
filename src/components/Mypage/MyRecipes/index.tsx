import Recipe from '@/components/common/Recipe';
import { useCallback, useEffect, useState } from 'react';
import { getInfo } from '@/lib/api/recipe';
import { RecipeInfoData } from '@/types/recipe';
import { useRouter } from 'next/router';
import Button from '@/components/common/Button';

export default function MyRecipes() {
  const [infoData, setInfoData] = useState<RecipeInfoData[]>([]);
  const router = useRouter();

  const getRecipeInfo = useCallback(async () => {
    try {
      const result = await getInfo(0);
      setInfoData(result);
    } catch (error) {
      console.error('저장된 레시피 가져오기 중 에러 발생', error)
    }
  }, []);

  useEffect(() => {
    getRecipeInfo();
  }, [getRecipeInfo]);

  const pushRecipes = () => {
    router.push('/recipes');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-20 py-30 lg:gap-30 lg:px-60 lg:py-50">
      {Array.isArray(infoData) && infoData.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-20 gap-y-30 lg:grid-cols-3 lg:gap-x-70 lg:gap-y-50">
          {infoData.map((data, index) => (
            <Recipe
              key={`${data}-${index}`}
              foodName={data.foodName}
              index={index}
              recipeId={data.recipeId}
              onDeleteSuccess={getRecipeInfo}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 pt-50 text-14 lg:pt-100 lg:text-20">
          <p>아직 저장한 레시피가 없어요.</p>
          <p>마음에 드는 레시피를 추가해 보세요!</p>
          <Button
            label="레시피 찾으러 가기"
            type="button"
            variant="secondary"
            className="mt-5 h-40 text-13 lg:mt-10 lg:h-50 lg:text-18"
            onClick={pushRecipes}
          />
        </div>
      )}
    </div>
  );
}
