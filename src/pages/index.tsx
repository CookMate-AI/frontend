import Button from '@/components/common/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  const handleMove = () => {
    router.push('/login');
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex h-310 w-full flex-col items-center justify-center bg-beige-300">
        <div className="flex items-center justify-center gap-10 text-30 font-extrabold">
          <span className="text-yellow">잔반 걱정 없는</span>
          <span>AI</span>
        </div>
        <div className="flex items-center justify-center gap-10">
          <Image src={'/icons/ic-title1.svg'} alt="title1" width={346} height={77} />
          <Image src={'/icons/ic-logo.svg'} alt="logo" width={150} height={150} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-90">
        <div className="grid max-w-full grid-cols-2 items-center justify-center gap-x-90 gap-y-120">
          <Image
            src={'/images/main1.png'}
            alt="main1"
            width={464}
            height={283}
            className="rounded-40"
          />
          <div className="flex flex-col gap-12">
            <h1 className="text-24 font-bold">레시피 확인</h1>
            <p className="text-20">
              AI가 추천한 레시피를 통해 요리해보세요. <br />
              레시피를 따라하기 위한 동영상도 제공해드려요.
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <h1 className="text-24 font-bold">남은 재료로 맛있는 요리를</h1>
            <p className="text-20">
              남은 재료를 사용해 요리를 만들어보세요. <br />
              재료에 맞게 AI가 음식을 추천해드려요.
            </p>
          </div>
          <Image
            src={'/images/main2.png'}
            alt="main2"
            width={464}
            height={283}
            className="rounded-40"
          />
          <Image
            src={'/images/main3.png'}
            alt="main3"
            width={464}
            height={283}
            className="rounded-40"
          />
          <div className="flex flex-col gap-12">
            <h1 className="text-24 font-bold">내 레시피 저장 기능</h1>
            <p className="text-20">
              추천받은 레시피를 저장해보세요. <br />
              언제든 저장한 레시피를 확인 할 수 있어요.
            </p>
          </div>
        </div>
      </div>
      <Button
        label="이용하기"
        className="fixed bottom-20 h-64 w-180 animate-bounce text-24"
        onClick={handleMove}
      />
    </div>
  );
}
