import ReactMarkdown from 'react-markdown';

interface RecipeProps {
  recipe: string;
}

const RecipeViewer: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div className="prose h-[500px] max-w-none overflow-y-auto scrollbar-hide">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
};

export default RecipeViewer;
