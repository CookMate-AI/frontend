import Button from '@/components/common/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  const handleMove = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/recipes');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex h-200 w-full flex-col items-center justify-center bg-beige-300 lg:h-310">
        <div className="flex items-center justify-center gap-10 text-20 font-extrabold lg:text-30">
          <span className="text-yellow-200">잔반 걱정 없는</span>
          <span>AI</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-50 w-150 lg:h-77 lg:w-300">
            <Image src={'/icons/ic-title1.svg'} alt="title1" fill className="object-contain" />
          </div>
          <div className="relative h-70 w-70 lg:h-140 lg:w-140">
            <Image src={'/icons/ic-logo.svg'} alt="logo" fill className="object-contain" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-30 lg:py-90">
        <div className="flex max-w-full flex-col items-center justify-center gap-10 lg:grid lg:grid-cols-2 lg:gap-x-90 lg:gap-y-120">
          <div className="relative order-1 h-180 w-300 lg:h-283 lg:w-464">
            <Image
              src={'/images/main1.png'}
              alt="main1"
              fill
              className="rounded-20 lg:rounded-40"
            />
          </div>
          <div className="order-2 flex w-300 flex-col gap-12 pl-5 lg:w-464 lg:pl-0">
            <h1 className="text-18 font-bold lg:text-24">레시피 확인</h1>
            <p className="text-14 lg:text-20">
              AI가 추천한 레시피를 통해 요리해보세요. <br />
              레시피를 찾기 위한 동영상 링크도 제공해드려요.
            </p>
          </div>
          <div className="order-4 flex w-300 flex-col gap-12 pl-5 lg:order-3 lg:w-464 lg:pl-0">
            <h1 className="text-18 font-bold lg:text-24">남은 재료로 맛있는 요리를</h1>
            <p className="text-14 lg:text-20">
              남은 재료를 사용해 요리를 만들어보세요. <br />
              재료에 맞게 AI가 음식을 추천해드려요.
            </p>
          </div>
          <div className="relative order-3 mt-40 h-180 w-300 lg:order-4 lg:mt-0 lg:h-283 lg:w-464">
            <Image
              src={'/images/main2.png'}
              alt="main2"
              fill
              className="rounded-20 lg:rounded-40"
            />
          </div>
          <div className="relative order-5 mt-40 h-180 w-300 lg:mt-0 lg:h-283 lg:w-464">
            <Image
              src={'/images/main3.png'}
              alt="main3"
              fill
              className="rounded-20 lg:rounded-40"
            />
          </div>
          <div className="order-6 flex w-300 flex-col gap-12 pl-5 lg:w-464 lg:pl-0">
            <h1 className="text-18 font-bold lg:text-24">내 레시피 저장 기능</h1>
            <p className="text-14 lg:text-20">
              추천받은 레시피를 저장해보세요. <br />
              언제든 저장한 레시피를 확인 할 수 있어요.
            </p>
          </div>
        </div>
      </div>
      <Button
        label="이용하기"
        className="fixed right-30 bottom-80 animate-bounce lg:bottom-20 lg:h-64 lg:w-180 lg:text-24"
        onClick={handleMove}
      />
    </div>
  );
}