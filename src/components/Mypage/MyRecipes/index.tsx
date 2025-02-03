import Recipe from '../Recipe';

export default function MyRecipes() {
  return (
    <div className="flex flex-col items-center justify-center gap-30 px-60 py-50">
      {/* <h1 className="fixed text-36 font-bold top-230">나의 레시피</h1> */}
      <div className="grid grid-cols-3 gap-x-70 gap-y-50">
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
