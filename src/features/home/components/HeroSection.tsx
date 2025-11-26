import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="flex h-200 w-full flex-col items-center justify-center bg-beige-300 lg:h-310">
      <div className="flex items-center justify-center gap-10 text-20 font-extrabold lg:text-30">
        <span className="text-yellow-200">잔반 걱정 없는</span>
        <span>AI</span>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative h-50 w-150 lg:h-77 lg:w-300">
          <Image src="/icons/ic-title1.svg" alt="title1" fill className="object-contain" />
        </div>

        <div className="relative h-70 w-70 lg:h-140 lg:w-140">
          <Image src="/icons/ic-logo.svg" alt="logo" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
