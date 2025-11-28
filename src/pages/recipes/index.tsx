import { RecipeChatInput } from '@/features/recipes/components/RecipesChatInput';
import { RecipeMessages } from '@/features/recipes/components/RecipesMessages';
import { useRecipesChat } from '@/features/recipes/hooks/useRecipesChat';

export default function RecipesPage() {
  const { ingredients, messages, messagesEndRef, handleChangeIngredients, handleSubmit } =
    useRecipesChat();

  return (
    <div className="px-40 pb-20 pt-40 lg:px-60 lg:pt-60">
      <div className="h-890 w-full rounded-24 bg-white lg:h-970">
        <div className="flex h-180 flex-col items-center justify-center gap-30 rounded-t-24 bg-orange-200 px-12 lg:h-260">
          <p className="text-16 font-bold text-white lg:text-24">
            당신의 냉장고에서 잠들고 있는 재료들을 입력해 보세요
          </p>

          <RecipeChatInput
            ingredients={ingredients}
            onChange={handleChangeIngredients}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="h-710 overflow-y-auto p-16 scrollbar-hide">
          <RecipeMessages messages={messages} messagesEndRef={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
