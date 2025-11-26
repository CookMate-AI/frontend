import Image from 'next/image';

export function FeatureSection() {
  return (
    <div className="flex flex-col items-center justify-center py-30 lg:py-90">
      <div className="flex max-w-full flex-col items-center justify-center gap-10 lg:grid lg:grid-cols-2 lg:gap-x-90 lg:gap-y-120">
        {/* 레시피 확인 */}
        <div className="relative order-1 h-180 w-300 lg:h-283 lg:w-464">
          <Image src="/images/main1.png" alt="main1" fill className="rounded-20 lg:rounded-40" />
        </div>
        <div className="order-2 flex w-300 flex-col gap-12 pl-5 lg:w-464 lg:pl-0">
          <h1 className="text-18 font-bold lg:text-24">레시피 확인</h1>
          <p className="text-14 lg:text-20">
            AI가 추천한 레시피를 통해 요리해보세요. <br />
            레시피 영상도 함께 제공돼요.
          </p>
        </div>

        {/* 남은 재료로 요리 */}
        <div className="order-4 flex w-300 flex-col gap-12 pl-5 lg:order-3 lg:w-464 lg:pl-0">
          <h1 className="text-18 font-bold lg:text-24">남은 재료로 맛있는 요리를</h1>
          <p className="text-14 lg:text-20">재료를 넣어 AI가 적합한 음식을 추천해드립니다.</p>
        </div>
        <div className="relative order-3 mt-40 h-180 w-300 lg:order-4 lg:mt-0 lg:h-283 lg:w-464">
          <Image src="/images/main2.png" alt="main2" fill className="rounded-20 lg:rounded-40" />
        </div>

        {/* 내 레시피 저장 */}
        <div className="relative order-5 mt-40 h-180 w-300 lg:mt-0 lg:h-283 lg:w-464">
          <Image src="/images/main3.png" alt="main3" fill className="rounded-20 lg:rounded-40" />
        </div>
        <div className="order-6 flex w-300 flex-col gap-12 pl-5 lg:w-464 lg:pl-0">
          <h1 className="text-18 font-bold lg:text-24">내 레시피 저장 기능</h1>
          <p className="text-14 lg:text-20">
            마음에 드는 레시피를 저장하고
            <br />
            언제든 확인할 수 있어요.
          </p>
        </div>
      </div>
    </div>
  );
}
