import Recipe from '@/components/common/Recipe';

export default function MyRecipes() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-20 px-20 py-30 lg:gap-30 lg:px-60 lg:py-50">
      {/* <h1 className="fixed text-36 font-bold top-230">나의 레시피</h1> */}
      <div className="grid grid-cols-2 gap-x-40 gap-y-30 lg:grid-cols-3 lg:gap-x-70 lg:gap-y-50">
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
      </div>
    </div>
  );
}
