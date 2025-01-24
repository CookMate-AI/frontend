import Image from 'next/image';

const links = ['회사소개', '고객센터', '이용약관', '개인정보취급방침'];

const companyInfo = [
  { title: '회사명', value: 'CookMate' },
  { title: '대표', value: '박OO' },
  { title: '대표번호', value: '070-1111-1111' },
  { title: '통신판매번호', value: '제 2025-서울-123456' },
  { title: '이메일', value: 'cookmate@email.com' },
  { title: '본점', value: '대한민국 어딘가' },
];

export default function Footer() {
  return (
    <div className="relative flex h-160 w-full flex-col items-center gap-17 bg-white px-40 text-12 text-gray-500">
      <div className="flex w-full items-center justify-between">
        <Image src={'/icons/ic-title2.svg'} alt="title2" width={180} height={60} />
        <div className="flex w-full justify-end gap-20 font-bold">
          {links.map((link, index) => (
            <p key={index} className="cursor-pointer">
              {link}
            </p>
          ))}
        </div>
      </div>
      <div className="flex w-full gap-10">
        {companyInfo.map(({ title, value }, index) => (
          <div key={index} className="flex items-center gap-4">
            <p className="font-bold">{title}</p>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-30 left-0 h-1 w-full border-b border-gray-500"></div>
      <div className="absolute bottom-1 right-40">© 2025. CookMate Inc. All rights reserved.</div>
    </div>
  );
}
