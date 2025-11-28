export interface RecipeProps {
  foodName: string;
  index?: number;
  recipeId?: number;
  onDeleteSuccess?: () => void;
}

export interface RecipeData {
  isSaved: string;
  recipe: string;
  category: number;
}

export interface RecipeSaveData {
  food: string;
  content: string;
  category: number;
}