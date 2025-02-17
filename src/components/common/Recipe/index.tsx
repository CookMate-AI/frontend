import Image from 'next/image';
import { RecipeProps } from '@/types/recipe';
import { useRecipeModal } from '@/stores/useModalStore';
import RecipeModal from '../RecipeModal';

export default function Recipe({ recipe }: RecipeProps) {
  const { isOpen: isIdOpen, openModal: openIdModal } = useRecipeModal();

  const handleClick = () => {
    openIdModal();
  };

  return (
    <>
      <div className="relative w-135 cursor-pointer active:animate-press" onClick={handleClick}>
        <Image src={'/icons/ic-recipe.svg'} alt="recipe" width={135} height={175} />
        <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 break-words px-10 text-center text-20 font-bold">
          {recipe}
        </p>
      </div>
      <RecipeModal isOpen={isIdOpen} videoUrl="https://www.youtube.com/watch?v=GjxUQWRbOTU" />
    </>
  );
}
