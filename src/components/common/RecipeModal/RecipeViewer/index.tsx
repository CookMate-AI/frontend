import ReactMarkdown from 'react-markdown';

interface RecipeProps {
  recipe: string;
}

const RecipeViewer: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div className="text-14 lg:text-16 prose h-full max-w-none overflow-y-auto scrollbar-hide">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
};

export default RecipeViewer;
