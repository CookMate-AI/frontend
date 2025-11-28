import ReactMarkdown from 'react-markdown';

interface RecipeViewerProps {
  recipe: string;
}

export function RecipeViewer({ recipe }: RecipeViewerProps) {
  return (
    <div className="prose h-full max-w-none overflow-y-auto text-14 scrollbar-hide lg:text-16">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
}
