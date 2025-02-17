import Image from 'next/image';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { UserMessage, BotMessage } from '@/types/messages';
import Recipe from '@/components/common/Recipe';

type Message = UserMessage | BotMessage;

export default function Recipes() {
  const [ingredients, setIngredients] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ingredients.trim()) return;

    // 입력한 값을 배열로 변환하는 코드
    // const ingredientList = ingredients.split(',').map((item) => item.trim());

    setMessages([
      ...messages,
      { type: 'user', content: ingredients },
      {
        type: 'bot',
        content: `추천 레시피`,
        recipes: ['김치찌개', '부대찌개', '된장찌개'],
      },
    ]);

    setIngredients('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="px-60 pb-20 pt-60">
      <div className="h-970 w-full rounded-24 bg-white">
        <div className="flex h-260 flex-col items-center justify-center gap-30 rounded-t-24 bg-orange-200 px-12">
          <p className="text-24 font-bold text-white">
            당신의 냉장고에서 잠들고 있는 재료들을 입력해 보세요
          </p>
          <form onSubmit={handleSubmit} className="relative w-full md:w-[600px] lg:w-[680px]">
            <input
              className="h-55 w-full rounded-24 border px-24 py-12 outline-none"
              placeholder="예시) 돼지고기, 감자, 양파 (,로 재료를 구분해서 작성해 주세요)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button type="submit">
              <Image
                src={'icons/ic-search.svg'}
                alt="검색 아이콘"
                width={30}
                height={30}
                className="absolute right-12 top-1/2 -translate-y-1/2"
              />
            </button>
          </form>
        </div>
        <div className="h-710 overflow-y-auto p-16 scrollbar-hide">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-8 rounded-lg p-16 ${
                message.type === 'user' ? 'ml-auto max-w-md bg-gray-100' : 'max-w-md bg-orange-100'
              }`}
            >
              <p className={`h-60 ${message.type === 'bot' ? 'rounded-t-lg bg-white p-14' : ''}`}>
                {message.content}
              </p>
              {message.type === 'bot' && message.recipes && (
                <div className="flex gap-12 rounded-b-lg bg-white p-12">
                  {message.recipes.map((recipe, i) => (
                    <Recipe key={i} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
