import Image from 'next/image';

export default function Recipe() {
  return (
    <div className="relative w-135 cursor-pointer active:animate-press">
      <Image
        src={'/icons/ic-recipe.svg'}
        alt="recipe"
        width={135}
        height={175}
      />
      <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 break-words px-10 text-center text-20 font-bold">
        메뉴 이름
      </p>
    </div>
  );
}
