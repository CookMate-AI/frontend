import Image from 'next/image';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { UserMessage, BotMessage, ErrorMessage } from '@/types/messages';
import Recipe from '@/components/common/Recipe';
import { postMenu } from '@/lib/api/recipe';

type Message = UserMessage | BotMessage | ErrorMessage;

export default function Recipes() {
  const [ingredients, setIngredients] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ingredients.trim()) return;

    try {
      const result = await postMenu(ingredients);
      console.log(result);
      if (result[0] === '응답 형식 오류') {
        setMessages([
          ...messages,
          { type: 'user', content: ingredients },
          {
            type: 'error',
            content: [
              '잘못된 재료이거나 해당 재료를 이용한 레시피가 없습니다.',
              '다시 입력해 주세요.',
            ],
          },
        ]);
      } else {
        setMessages([
          ...messages,
          { type: 'user', content: ingredients },
          {
            type: 'bot',
            content: `AI 추천 레시피`,
            recipes: result,
          },
        ]);
      }
    } catch (error) {
      console.error('메뉴 추천 중 에러 발생', error);
      setMessages([
        ...messages,
        { type: 'user', content: ingredients },
        {
          type: 'error',
          content: [
            '메뉴 추천 중 에러가 발생했습니다.',
            '다시 입력해 주세요.',
          ],
        },
      ]);
    }

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
                message.type === 'user'
                  ? 'ml-auto max-w-md bg-gray-100'
                  : message.type === 'error'
                    ? 'max-w-md bg-red-50'
                    : 'max-w-md bg-orange-100'
              }`}
            >
              {message.type === 'error' ? (
                <div className="flex flex-col gap-2 text-red-500">
                  {message.content.map((line, i) => (
                    <p key={i} className="text-center">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className={`h-60 ${message.type === 'bot' ? 'rounded-t-lg bg-white p-14' : ''}`}>
                  {message.content}
                </p>
              )}
              {message.type === 'bot' && message.recipes && (
                <div className="flex gap-12 rounded-b-lg bg-white p-12">
                  {message.recipes.map((recipe, index) => (
                    <Recipe key={`${recipe}-${index}`} foodName={recipe} index={index} />
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
