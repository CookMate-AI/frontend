import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Page404() {
  const router = useRouter();

  const handleClickHome = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-260px)] w-full flex-col items-center justify-center gap-16 text-20">
      <Image src={'/icons/ic-404.svg'} alt="404 icon" width={200} height={200} />
      <div className="flex flex-col items-center justify-center gap-8">
        <p>잘못된 경로입니다!</p>
        <p>홈에서 다시 이용해 주세요.</p>
      </div>
      <button
        className="flex w-160 items-center justify-center rounded-20 bg-gray-400 p-16 text-white"
        onClick={handleClickHome}
      >
        홈으로 가기
      </button>
    </div>
  );
}
