import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex h-160 w-full items-center bg-mint-50 px-40">
      <div className="flex w-full items-center justify-between">
        <Image src={'/icons/ic-title2.svg'} alt="title2" width={180} height={60} />
        <div className="flex w-full gap-20 justify-end">
          <p className="cursor-pointer text-12 text-gray-500">회사소개</p>
          <p className="cursor-pointer text-12 text-gray-500">고객센터</p>
          <p className="cursor-pointer text-12 text-gray-500">이용약관</p>
          <p className="cursor-pointer text-12 text-gray-500">개인정보취급방침</p>
        </div>
      </div>
    </div>
  );
}
