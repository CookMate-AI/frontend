// src/features/recipes/ui/RecipesMessages.tsx
import type { RefObject } from 'react';

import type { ChatMessage } from '../types/messagesType';
import { RecipeCard } from './RecipesCard';

interface RecipeMessagesProps {
  messages: ChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function RecipeMessages({ messages, messagesEndRef }: RecipeMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400">재료를 입력하면 추천 레시피가 표시됩니다.</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((message, index) => {
        // 🔥 현재 bot 메시지와 가장 가까운 이전 user 메시지 찾기
        let ingredients = '';

        if (message.type === 'bot') {
          const prevUser = [...messages]
            .slice(0, index) // 현재 index 이전만 본다
            .reverse() // 뒤에서부터
            .find((m) => m.type === 'user');

          if (prevUser && prevUser.type === 'user') {
            ingredients = prevUser.content;
          }
        }

        return (
          <div
            key={index}
            className={`mb-8 w-370 rounded-lg p-16 lg:w-450 ${
              message.type === 'user'
                ? 'ml-auto max-w-md bg-gray-100'
                : message.type === 'error'
                  ? 'max-w-md bg-red-50'
                  : 'max-w-md bg-orange-100'
            }`}
          >
            {message.type === 'error' ? (
              <div className="flex flex-col gap-2 text-14 text-red-500 lg:text-16">
                {message.content.map((line, i) => (
                  <p key={i} className="text-center">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p
                className={`h-60 text-14 lg:text-16 ${
                  message.type === 'bot' ? 'rounded-t-lg bg-white p-14' : ''
                }`}
              >
                {message.content}
              </p>
            )}

            {message.type === 'bot' && message.recipes && (
              <div className="flex justify-center gap-12 rounded-b-lg bg-white p-12">
                {message.recipes.map((recipe, i) => (
                  <RecipeCard
                    key={`${recipe}-${i}`}
                    foodName={recipe}
                    mode="search"
                    ingredients={ingredients} // 🔥 여기서 전달
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </>
  );
}
