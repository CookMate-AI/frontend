export interface RecipeProps {
  foodName: string;
  index: number;
}

export interface RecipeData {
  isSaved: string;
  recipe: string;
  category: number;
}

export interface RecipeSaveData {
  food: string;
  recipe: string;
  category: number;
}