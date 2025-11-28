import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { postMenu } from '../api/recipesApi';
import type { ChatMessage } from '../types/messagesType';

export function useRecipesChat() {
  const [ingredients, setIngredients] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleChangeIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = ingredients.trim();
    if (!trimmed) return;

    try {
      const result = await postMenu(trimmed);

      setMessages((prev) => {
        const userMsg: ChatMessage = { type: 'user', content: trimmed };

        if (result[0] === '응답 형식 오류') {
          const errorMsg: ChatMessage = {
            type: 'error',
            content: [
              '잘못된 재료이거나 해당 재료를 이용한 레시피가 없습니다.',
              '다시 입력해 주세요.',
            ],
          };
          return [...prev, userMsg, errorMsg];
        }

        const botMsg: ChatMessage = {
          type: 'bot',
          content: 'AI 추천 레시피',
          recipes: result,
        };

        return [...prev, userMsg, botMsg];
      });
    } catch (error) {
      console.error('메뉴 추천 중 에러 발생', error);

      setMessages((prev) => [
        ...prev,
        { type: 'user', content: trimmed },
        {
          type: 'error',
          content: ['메뉴 추천 중 에러가 발생했습니다.', '다시 입력해 주세요.'],
        },
      ]);
    }

    setIngredients('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return {
    ingredients,
    messages,
    messagesEndRef,
    handleChangeIngredients,
    handleSubmit,
  };
}
