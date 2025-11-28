import Image from 'next/image';
import type { ChangeEventHandler, FormEventHandler } from 'react';

interface RecipeChatInputProps {
  ingredients: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function RecipeChatInput({ ingredients, onChange, onSubmit }: RecipeChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative w-full px-30">
      <input
        className="h-40 w-full rounded-24 border px-24 py-12 text-14 outline-none lg:h-55 lg:text-18"
        placeholder="예시) 돼지고기, 감자, 양파 (,로 재료를 구분해서 작성해 주세요)"
        value={ingredients}
        onChange={onChange}
      />
      <button type="submit">
        <Image
          src="/icons/ic-search.svg"
          alt="검색 아이콘"
          width={24}
          height={24}
          className="absolute right-40 top-1/2 -translate-y-1/2"
        />
      </button>
    </form>
  );
}
